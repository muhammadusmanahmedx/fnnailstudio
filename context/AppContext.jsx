'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const { user } = useUser()
    const { getToken } = useAuth()
    const { openSignIn } = useClerk()

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [wishlistItems, setWishlistItems] = useState([])
    const [isCartLoaded, setIsCartLoaded] = useState(false)
    
    // Toast management - limit to 2 toasts at a time
    const activeToasts = new Set();
    const maxToasts = 2;
    
    const showLimitedToast = (message, type = 'success') => {
        // Dismiss oldest toast if we've reached the limit
        if (activeToasts.size >= maxToasts) {
            const oldestToast = Array.from(activeToasts)[0];
            toast.dismiss(oldestToast);
            activeToasts.delete(oldestToast);
        }
        
        const toastId = type === 'error' 
            ? toast.error(message, {
                duration: 2000,
            })
            : toast.success(message, {
                duration: 2000,
            });
        
        activeToasts.add(toastId);
        
        // Remove from active toasts after it's dismissed
        setTimeout(() => {
            activeToasts.delete(toastId);
        }, 2100);
        
        return toastId;
    }


    const fetchProductData = async () => {

        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
                // Clean up cart items after products are loaded
                cleanupCartItems(data.products)
            } else {
                console.log('API failed, using dummy data:', data.message)
                setProducts(productsDummyData)
                cleanupCartItems(productsDummyData)
            }

        } catch (error) {
            console.log('API error, using dummy data:', error.message)
            setProducts(productsDummyData)
            cleanupCartItems(productsDummyData)
        }

    }

    // Clean up cart items that reference non-existent products
    const cleanupCartItems = (productsList) => {
        setCartItems(prevCartItems => {
            const cleanedCartItems = {};
            for (const cartKey in prevCartItems) {
                // Extract product ID from the composite key (format: productId_color)
                const productId = prevCartItems[cartKey].productId || cartKey.split('_')[0];
                const productExists = productsList.find(product => product._id === productId);
                
                const quantity = typeof prevCartItems[cartKey] === 'number' 
                    ? prevCartItems[cartKey] 
                    : prevCartItems[cartKey].quantity || 0;
                    
                if (productExists && quantity > 0) {
                    cleanedCartItems[cartKey] = prevCartItems[cartKey];
                }
            }
            return cleanedCartItems;
        });
    }


    // Fetch categories data
    const fetchCategoriesData = async () => {
        try {
            const { data } = await axios.get('/api/categories');
            if (data.success) {
                setCategories(data.categories);
            } else {
                showLimitedToast(data.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    //user data fetch
    const fetchUserData = async () => {
        try {
            if (user?.publicMetadata?.role === "seller") {
                setIsSeller(true);
            }

            const token = await getToken();

            const { data } = await axios.get("/api/user/data", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.success === "true" || data.success === true) {
                setUserData(data.user);
                // Ensure cart items are set, even if empty
                const userCart = data.user.cartItems || {};
                setCartItems(userCart);
                setIsCartLoaded(true);
                console.log('Cart items loaded from DB:', userCart);
            } else {
                console.log('User data fetch failed:', data.message);
                setCartItems({});
                setIsCartLoaded(true);
            }
        } catch (error) {
            console.log('User data fetch error:', error.message);
            setCartItems({});
            setIsCartLoaded(true);
        }
    };



    // Function to convert hex color to nearest color name
    const getColorNameFromHex = (hex) => {
        const colors = {
            '#000000': 'Black',
            '#FFFFFF': 'White',
            '#FF0000': 'Red',
            '#00FF00': 'Green',
            '#0000FF': 'Blue',
            '#FFFF00': 'Yellow',
            '#FF00FF': 'Magenta',
            '#00FFFF': 'Cyan',
            '#FFA500': 'Orange',
            '#800080': 'Purple',
            '#FFC0CB': 'Pink',
            '#A52A2A': 'Brown',
            '#808080': 'Gray',
            '#C0C0C0': 'Silver',
            '#FFD700': 'Gold',
            '#E6E6FA': 'Lavender',
            '#F0E68C': 'Khaki',
            '#90EE90': 'Light Green',
            '#87CEEB': 'Sky Blue',
            '#FF69B4': 'Hot Pink',
        };

        // Convert hex to RGB
        const hexToRgb = (h) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        const rgb = hexToRgb(hex);
        if (!rgb) return 'Custom';

        // Find nearest color
        let minDistance = Infinity;
        let nearestColor = 'Custom';

        Object.entries(colors).forEach(([colorHex, colorName]) => {
            const colorRgb = hexToRgb(colorHex);
            if (colorRgb) {
                const distance = Math.sqrt(
                    Math.pow(rgb.r - colorRgb.r, 2) +
                    Math.pow(rgb.g - colorRgb.g, 2) +
                    Math.pow(rgb.b - colorRgb.b, 2)
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestColor = colorName;
                }
            }
        });

        return nearestColor;
    }

    const addToCart = async (itemId, options = {}) => {
        
        // Check if user is authenticated
        if (!user) {
            showLimitedToast("Please sign in to add items to cart", 'error');
            openSignIn();
            return;
        }

        let cartData = structuredClone(cartItems);
        
        // Get the color name from options, or convert hex to color name
    const colorHex = (options.color || '#FFFFFF').toUpperCase();
    const colorName = options.colorName || getColorNameFromHex(colorHex);
        
        // Create a unique key combining product ID and color NAME (not hex code)
        const cartKey = `${itemId}_${colorName}`;
        
        console.log('Adding to cart - Product ID:', itemId, 'Color Name:', colorName, 'Cart Key:', cartKey);
        console.log('Current cart items:', cartData);
        console.log('Does cart key exist?', cartKey in cartData);
        
        // Check if exact same product with exact same color name already exists
        if (cartData[cartKey]) {
            console.log('Found existing item, incrementing quantity');
            // If item with same ID and color name exists, just increment quantity
            if (typeof cartData[cartKey] === 'number') {
                cartData[cartKey] = {
                    quantity: cartData[cartKey] + 1,
                };
            } else {
                cartData[cartKey].quantity += 1;
            }

            cartData[cartKey] = {
                ...cartData[cartKey],
                productId: itemId,
                color: colorHex,
                colorHex: colorHex,
                colorName: colorName,
                ...options,
            };
        } else {
            console.log('Creating new cart entry');
            // New item with unique color name - create new entry
            cartData[cartKey] = {
                ...options,
                productId: itemId,
                quantity: 1,
                color: colorHex,
                colorHex: colorHex,
                colorName: colorName,
            };
        }
        
        setCartItems(cartData);
        console.log('Adding to cart, new cart data:', cartData);

        try {
            const token = await getToken();

            const response = await axios.post("/api/cart/update", { cartData }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            console.log('Cart update response:', response.data);
            
            if (response.data.success) {
                showLimitedToast("Item added to cart");
            } else {
                showLimitedToast(response.data.message || "Failed to update cart", 'error');
            }

        } catch (error) {
            console.error('Error updating cart:', error);
            showLimitedToast(error.message, 'error');
        }
    }



    const updateCartQuantity = async (cartKey, quantity, options = {}) => {

        let cartData = structuredClone(cartItems);
        
        if (quantity === 0) {
            delete cartData[cartKey];
        } else {
            const [productIdFromKey, ...colorSegments] = cartKey.split('_');
            const colorFromKey = colorSegments.length ? colorSegments.join('_') : null;

            const existingItem =
                typeof cartData[cartKey] === 'object' && cartData[cartKey] !== null
                    ? { ...cartData[cartKey] }
                    : {};

            const colorHex = (options.color || existingItem.color || '#FFFFFF').toUpperCase();
            // Prioritize the colorName from options, then existing, then derive from key or hex
            const resolvedColorName = options.colorName || existingItem.colorName || colorFromKey || getColorNameFromHex(colorHex) || 'Default';

            // Check if color is being changed and if we need to merge with existing item
            const newCartKey = `${productIdFromKey}_${resolvedColorName}`;
            
            if (options.color && newCartKey !== cartKey) {
                // Color is being changed to a different value
                // Check if an item with the new color already exists
                if (cartData[newCartKey]) {
                    // Merge: Add quantity to existing item with that color
                    const existingQuantity = typeof cartData[newCartKey] === 'number' 
                        ? cartData[newCartKey] 
                        : cartData[newCartKey].quantity || 0;
                    
                    cartData[newCartKey] = {
                        ...(typeof cartData[newCartKey] === 'object' ? cartData[newCartKey] : {}),
                        productId: productIdFromKey,
                        quantity: existingQuantity + quantity,
                        colorName: resolvedColorName,
                        color: colorHex,
                        colorHex: colorHex,
                    };
                    // Remove the old cart key
                    delete cartData[cartKey];
                } else {
                    // No existing item with that color, so rename the key
                    cartData[newCartKey] = {
                        ...existingItem,
                        productId: productIdFromKey,
                        quantity: quantity,
                        colorName: resolvedColorName,
                        color: colorHex,
                        colorHex: colorHex,
                    };
                    // Remove the old cart key
                    delete cartData[cartKey];
                }
            } else {
                // Just updating quantity, no color change
                cartData[cartKey] = {
                    ...existingItem,
                    productId: existingItem.productId || productIdFromKey,
                    quantity: quantity,
                    colorName: resolvedColorName,
                    color: colorHex,
                    colorHex: colorHex,
                };
            }
        }
        
        setCartItems(cartData)
        console.log('Updating cart quantity, new cart data:', cartData);

        if (user) {
            try {
                const token = await getToken();

                const response = await axios.post("/api/cart/update", { cartData }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }

                );
                
                console.log('Cart update response:', response.data);
                
                // Only show toast for manual updates, not color changes
                if (!options.color || quantity === 0) {
                    if (response.data.success) {
                        showLimitedToast(quantity === 0 ? "Item removed from cart" : "Cart Updated");
                    } else {
                        showLimitedToast(response.data.message || "Failed to update cart", 'error');
                    }
                }



            } catch (error) {
                console.error('Error updating cart:', error);
                showLimitedToast(error.message, 'error')
            }

        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items]) {
                // Handle both old format (number) and new format (object with quantity)
                const quantity = typeof cartItems[items] === 'number' 
                    ? cartItems[items] 
                    : cartItems[items].quantity || 0;
                if (quantity > 0) {
                    totalCount += quantity;
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const cartKey in cartItems) {
            // Extract product ID from the composite key (format: productId_color)
            const productId = cartItems[cartKey].productId || cartKey.split('_')[0];
            let itemInfo = products.find((product) => product._id === productId);
            if (itemInfo) {
                // Handle both old format (number) and new format (object with quantity)
                const quantity = typeof cartItems[cartKey] === 'number' 
                    ? cartItems[cartKey] 
                    : cartItems[cartKey].quantity || 0;
                if (quantity > 0) {
                    // Use offerPrice if it exists and is greater than 0, otherwise use regular price
                    const price = itemInfo.offerPrice && itemInfo.offerPrice > 0 ? itemInfo.offerPrice : itemInfo.price;
                    totalAmount += price * quantity;
                }
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    // Wishlist Functions
    const addToWishlist = (product) => {
        const newWishlistItems = [...wishlistItems, { id: product._id, product }];
        setWishlistItems(newWishlistItems);
        if (typeof window !== 'undefined') {
            localStorage.setItem('wishlistItems', JSON.stringify(newWishlistItems));
        }
        showLimitedToast(`${product.name} added to wishlist!`);
    };

    const removeFromWishlist = (productId) => {
        const newWishlistItems = wishlistItems.filter(item => item.id !== productId);
        setWishlistItems(newWishlistItems);
        if (typeof window !== 'undefined') {
            localStorage.setItem('wishlistItems', JSON.stringify(newWishlistItems));
        }
        const product = products.find(p => p._id === productId);
        showLimitedToast(`${product?.name || 'Item'} removed from wishlist!`);
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const getWishlistCount = () => {
        return wishlistItems.length;
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    useEffect(() => {
        fetchProductData();
        fetchCategoriesData();
        
        // Load wishlist from localStorage (client-side only)
        if (typeof window !== 'undefined') {
            const savedWishlist = localStorage.getItem('wishlistItems');
            if (savedWishlist) {
                try {
                    setWishlistItems(JSON.parse(savedWishlist));
                } catch (error) {
                    console.error('Error parsing wishlist from localStorage:', error);
                    setWishlistItems([]);
                }
            }
        }
    }, [])

    useEffect(() => {
        if (user) {
            console.log('User detected, fetching user data');
            // Only fetch if cart hasn't been loaded yet
            if (!isCartLoaded) {
                fetchUserData()
            }
        } else {
            // Clear cart items when user logs out
            setCartItems({});
            setIsCartLoaded(false);
            // Clear localStorage as well
            if (typeof window !== 'undefined') {
                localStorage.removeItem('cartItems');
            }
        }
    }, [user, isCartLoaded])
    
    // Sync cart items to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined' && isCartLoaded) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log('Cart synced to localStorage:', cartItems);
        }
    }, [cartItems, isCartLoaded])

    const value = {
        user, getToken, openSignIn,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        categories, fetchCategoriesData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        wishlistItems, setWishlistItems,
        addToWishlist, removeFromWishlist,
        isInWishlist, getWishlistCount, toggleWishlist
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}