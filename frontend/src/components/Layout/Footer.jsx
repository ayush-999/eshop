import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-2 gap-8 pt-6 pb-8 md:grid-cols-4">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white uppercase">
                Company
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-normal">
                <li className="mb-1">
                  <Link
                    to="/about"
                    className=" text-sm hover:text-white hover:underline"
                  >
                    About
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/careers"
                    className="text-sm hover:text-white hover:underline"
                  >
                    Careers
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/faq"
                    className="text-sm hover:text-white hover:underline"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/blog"
                    className="text-sm hover:text-white hover:underline"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white">
                Help center
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-normal">
                <li className="mb-1">
                  <Link
                    to=""
                    className="text-sm hover:text-white hover:underline"
                  >
                    Twitter
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to=""
                    className="text-sm hover:text-white hover:underline"
                  >
                    Facebook
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to=""
                    className="text-sm hover:text-white hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-normal">
                <li className="mb-1">
                  <Link
                    to="/privacy-policy"
                    className="text-sm hover:text-white hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="/terms-conditions"
                    className="text-sm hover:text-white hover:underline"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-white">
                Download
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-normal">
                <li className="mb-1">
                  <Link
                    to="#"
                    className="text-sm hover:text-white hover:underline"
                  >
                    <img
                      src="assets/img/appStore.png"
                      className="footer-appImg mb-3"
                    />
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    to="#"
                    className="text-sm hover:text-white hover:underline"
                  >
                    <img
                      src="assets/img/playStore.png"
                      className="footer-appImg"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-3 pb-2 bg-gray-900 flex items-center justify-between mx-auto w-full max-w-screen-xl border-t-[1px] border-gray-700">
          <div className="flex space-x-5 rtl:space-x-reverse">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              title="Facebook"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              title="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-4 h-4"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
              <span className="sr-only">Instagram page</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
              title="Twitter"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
          </div>
          <span className="text-sm text-gray-500 text-center">
            © 2023 <Link to="">Eshop</Link>. All Rights Reserved.
          </span>
          <div className="flex items-center justify-between">
            <div className="payment-method-wrap">
              <img
                src="assets/img/payment-method.svg"
                className="payment-method-img"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
