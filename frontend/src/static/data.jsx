import { getRandomHexColor } from '../utils/helper';

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

// branding data
export const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "From all orders over 100rs",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H5.63636V24.1818H35"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M34.9982 1H11.8164V18H34.9982V1Z"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M11.8164 7.18164H34.9982"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Daily Surprise Offers",
    Description: "Save up to 25% off",
    icon: (
      <svg
        width="32"
        height="34"
        viewBox="0 0 32 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M30.7 2L29.5 10.85L20.5 9.65"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Affortable Prices",
    Description: "Get Factory direct price",
    icon: (
      <svg
        width="32"
        height="35"
        viewBox="0 0 32 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M16 28V22"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
        ></path>
        <path
          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Secure Payments",
    Description: "100% protected payments",
    icon: (
      <svg
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
        <path
          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
          stroke="#4a51e1"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="square"
        ></path>
      </svg>
    ),
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Books",
    subTitle: "",
    image_Url: "https://m.media-amazon.com/images/I/81iss3ldpLL._SX342_.jpg",
  },
  {
    id: 2,
    title: "Mobiles & Tablets",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/44e10b16e649b691.jpg?q=100",
  },
  {
    id: 3,
    title: "TVs & Appliances",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/717b5077a5e25324.jpg?q=100",
  },
  {
    id: 4,
    title: "Electronics",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/4da1d0d19350cc84.jpg?q=100",
  },
  {
    id: 5,
    title: "Fashion",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/9d4e9c605fc1d2d3.jpg?q=100",
  },
  {
    id: 6,
    title: "Beauty",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/a5e656672d0548dd.jpg?q=100",
  },
  {
    id: 7,
    title: "Home & Kitchen",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/5b813b64a3179898.jpg?q=100",
  },
  {
    id: 8,
    title: "Furniture",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/7a5e96c10ada8a56.jpg?q=100",
  },
  {
    id: 9,
    title: "Travel",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/57fe1ffe54569c41.jpg?q=100",
  },
  {
    id: 10,
    title: "Grocery",
    subTitle: "",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/25f400c36bc3487d.jpg?q=100",
  },
];

// product Data
// export const productData = [
//   {
//     id: 1,
//     category: "Computers and Laptops",
//     name: "MacBook pro M2 chipset 256gb ssd 8gb ram space-gray color with apple 1 year warranty",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/l/q/t/-original-imaguw3hwp55jj7b.jpeg?q=70",
//       },
//       {
//         public_id: "test",
//         url: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/l/q/t/-original-imaguw3hwp55jj7b.jpeg?q=70",
//       },
//     ],
//     shop: {
//       name: "Apple inc.",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 1099,
//     discount_price: 1049,
//     rating: 4,
//     total_sell: 35,
//     stock: 10,
//   },
//   {
//     id: 2,
//     category: "Mobile and Tablets",
//     name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
//       },
//       {
//         public_id: "test",
//         url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
//       },
//     ],
//     shop: {
//       name: "Amazon Ltd",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 1099,
//     discount_price: 1099,
//     rating: 5,
//     total_sell: 80,
//     stock: 10,
//   },
//   {
//     id: 3,
//     category: "Computers and Laptops",
//     name: "MacBook pro M2 chipset 256gb ssd 8gb ram space gray color with apple 1 year warranty",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://images.ctfassets.net/hrltx12pl8hq/01rJn4TormMsGQs1ZRIpzX/16a1cae2440420d0fd0a7a9a006f2dcb/Artboard_Copy_231.jpg?fit=fill&w=600&h=600",
//       },
//       {
//         public_id: "test",
//         url: "https://images.ctfassets.net/hrltx12pl8hq/01rJn4TormMsGQs1ZRIpzX/16a1cae2440420d0fd0a7a9a006f2dcb/Artboard_Copy_231.jpg?fit=fill&w=600&h=600",
//       },
//     ],
//     shop: {
//       name: "Apple inc.",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 1099,
//     discount_price: 1049,
//     rating: 4,
//     total_sell: 75,
//     stock: 10,
//   },
//   {
//     id: 4,
//     category: "Others",
//     name: "New Fashionable Watch for men 2023 with multiple colors",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
//       },
//       {
//         public_id: "test",
//         url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
//       },
//     ],
//     shop: {
//       name: "Shahriar Watch House",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 100,
//     discount_price: 79,
//     rating: 4,
//     total_sell: 12,
//     stock: 10,
//   },
//   {
//     id: 5,
//     category: "Shoes",
//     name: "New Trend shoes for gents with all sizes",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://rukminim2.flixcart.com/image/612/612/l407mvk0/shoe/j/a/v/-original-imagfyyvdfndjxg7.jpeg?q=70",
//       },
//       {
//         public_id: "test",
//         url: "https://rukminim2.flixcart.com/image/612/612/l407mvk0/shoe/j/a/v/-original-imagfyyvdfndjxg7.jpeg?q=70",
//       },
//     ],
//     shop: {
//       name: "Alisha Shoes Mart",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 120,
//     discount_price: 89,
//     rating: 5,
//     total_sell: 49,
//     stock: 10,
//   },
//   {
//     id: 6,
//     name: "Gaming Headphone Asus with mutiple color and free delivery",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://m.media-amazon.com/images/I/71raaXgxhtL._AC_UY327_FMwebp_QL65_.jpg",
//       },
//       {
//         public_id: "test",
//         url: "https://m.media-amazon.com/images/I/71raaXgxhtL._AC_UY327_FMwebp_QL65_.jpg",
//       },
//     ],
//     shop: {
//       name: "Asus Ltd",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 300,
//     discount_price: 239,
//     rating: 4.5,
//     reviews: [
//       {
//         user: {
//           // user object will be here
//         },
//         comment: "IT's so cool!",
//         rating: 5,
//       },
//     ],
//     total_sell: 20,
//     stock: 10,
//     category: "Mobile and Tablets",
//   },
//   {
//     id: 7,
//     name: "New Fashionable Watch for men 2023 with multiple colors",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
//       },
//       {
//         public_id: "test",
//         url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
//       },
//     ],
//     shop: {
//       name: "Shahriar Watch House",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 100,
//     discount_price: 79,
//     rating: 4,
//     total_sell: 62,
//     stock: 10,
//     category: "Shoes",
//   },
//   {
//     id: 8,
//     name: "Gaming Headphone Asus with mutiple color and free delivery",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
//       },
//       {
//         public_id: "test",
//         url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
//       },
//     ],
//     shop: {
//       name: "Asus Ltd",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 300,
//     discount_price: 239,
//     rating: 4.5,
//     reviews: [
//       {
//         user: {
//           // user object will be here
//         },
//         comment: "IT's so cool!",
//         rating: 5,
//       },
//     ],
//     total_sell: 20,
//     stock: 10,
//     category: "Others",
//   },
//   {
//     id: 9,
//     category: "Mobile and Tablets",
//     name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
//       },
//       {
//         public_id: "test",
//         url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
//       },
//     ],
//     shop: {
//       name: "Amazon Ltd",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     discount_price: 1099,
//     rating: 5,
//     total_sell: 20,
//     stock: 10,
//   },
//   {
//     id: 10,
//     category: "Mobile and Tablets",
//     name: "Gaming Headphone Asus with mutiple color and free delivery",
//     description:
//       "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
//     image_Url: [
//       {
//         public_id: "test",
//         url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
//       },
//       {
//         public_id: "test",
//         url: "https://eratablet.com/wp-content/uploads/2022/08/H51ba6537405f4948972e293927673546u.jpg",
//       },
//     ],
//     shop: {
//       name: "Asus Ltd",
//       shop_avatar: {
//         public_id: "test",
//         url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
//       },
//       ratings: 4.2,
//     },
//     price: 300,
//     discount_price: 239,
//     rating: 4.5,
//     reviews: [
//       {
//         user: {
//           // user object will be here
//         },
//         comment: "IT's so cool!",
//         rating: 5,
//       },
//     ],
//     total_sell: 20,
//     stock: 10,
//   },
// ];

export const productData = [
  ...Array.from({ length: 100 }).map((_, index) => {
    const price = parseFloat((Math.random() * 1000 + 100).toFixed(0)); // Random price between $100 and $1100
    const discountPrice = parseFloat(
      (Math.random() * (price - 50) + 50).toFixed(0)
    ); // Discount price always less than price
    const discountPercent = (((price - discountPrice) / price) * 100).toFixed(0);
    return {
      id: index + 1,
      category: [
        "Computers and Laptops",
        "Mobile and Tablets",
        "Others",
        "Shoes",
      ][index % 4],
      name: `Product Name ${index + 1}`,
      description:
        "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales. Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
      image_Url: Array.from({ length: 8 }).map((_, imageIndex) => {
        const bgColor = getRandomHexColor();
        const textColor = getRandomHexColor();
        return {
          public_id: `test${index + 1}_${imageIndex + 1}`,
          url: `https://dummyimage.com/512x560/${bgColor}/${textColor}&text=Product+${
            index + 1
          }+Image+${imageIndex + 1}`,
        };
      }),
      shop: {
        id: index + 1,
        name: ["Apple Inc.", "Amazon Ltd", "Asus Ltd", "Shahriar Watch House"][
          index % 4
        ],
        shop_avatar: {
          public_id: `shop${index % 4}`,
          url: `https://dummyimage.com/100x100/${getRandomHexColor()}/fff&text=Shop+${
            (index % 4) + 1
          }`,
        },
        ratings: (Math.random() * 2 + 3).toFixed(1), // Random rating between 1 and 5
        reviews: Array.from({ length: Math.floor(Math.random() * 10 + 1) }).map(
          (_, reviewIndex) => ({
            user: {
              username: `Shop User ${index + 1}_${reviewIndex + 1}`,
              avatar_url: `https://dummyimage.com/50x50/${getRandomHexColor()}/fff&text=User+${
                reviewIndex + 1
              }`,
            },
            comment_title: `Shop review title ${index + 1} ${reviewIndex + 1}`,
            comment: `Shop review comment for product ${index + 1} by user ${
              reviewIndex + 1
            }`,
            rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 1 and 5
            review_date: new Date().toISOString(),
          })
        ),
      },
      price,
      discount_price: discountPrice,
      discount_percent: `${discountPercent}%`,
      total_sell: Math.floor(Math.random() * 1000), // Random total sell between 0 and 999
      stock: Math.floor(Math.random() * 50 + 1), // Random stock between 1 and 50
      ratings: (Math.random() * 2 + 3).toFixed(1), // Random ratings between 3.0 and 5.0
      reviews: Array.from({ length: Math.floor(Math.random() * 10 + 1) }).map(
        (_, reviewIndex) => ({
          user: {
            username: `Product User ${index + 1}_${reviewIndex + 1}`,
            avatar_url: `https://dummyimage.com/50x50/${getRandomHexColor()}/fff&text=User+${
              reviewIndex + 1
            }`,
          },
          comment_title: `Review title product ${index + 1} ${reviewIndex + 1}`,
          comment: `Review comment for product ${index + 1} by user ${
            reviewIndex + 1
          }`,
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 1 and 5
          review_date: new Date().toISOString(),
        })
      ),
    };
  }),
];

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/carrers",
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Game & Video",
  },
  {
    name: "Phone &Tablets",
  },
  {
    name: "Computers & Laptop",
  },
  {
    name: "Sport Watches",
  },
  {
    name: "Events",
  },
];

export const footerSupportLinks = [
  {
    name: "FAQ",
  },
  {
    name: "Reviews",
  },
  {
    name: "Contact Us",
  },
  {
    name: "Shipping",
  },
  {
    name: "Live chat",
  },
];

export const sliderItems = [
  {
    id: 1,
    url: "/",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/dff6511cbf3c625e.jpg?q=20",
  },
  {
    id: 2,
    url: "/",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/b1ba982123cb572a.jpg?q=20",
  },
  {
    id: 3,
    url: "/",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1f789e69c730eeef.jpg?q=20",
  },
  {
    id: 4,
    url: "/",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/875690a28393fe66.jpg?q=20",
  },
  {
    id: 5,
    url: "/",
    image_Url:
      "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/89f8eeb28f03fe04.jpg?q=20",
  },
];
