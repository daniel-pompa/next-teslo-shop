// import Link from 'next/link';
// import {
//   FaFacebook,
//   FaXTwitter,
//   FaInstagram,
//   FaEnvelope,
//   FaPhone,
//   FaCcVisa,
//   FaCcMastercard,
//   FaCcPaypal,
// } from 'react-icons/fa6';
// import { FaMapMarkerAlt } from 'react-icons/fa';

// export const Footer = () => {
//   return (
//     <footer className='py-8 border-t-2 border-slate-200 bg-slate-50'>
//       <div className='container mx-auto px-4'>
//         <div className='w-full flex flex-col md:flex-row justify-between gap-8 text-center md:text-left'>
//           {/* Section 1: Logo, description and payment methods */}
//           <div className='mb-8 md:mb-0'>
//             <h3 className='font-bold mb-4'>
//               Teslo
//               <span className='text-slate-500 hover:text-slate-700 transition-colors'>
//                 {' '}
//                 Shop
//               </span>
//             </h3>
//             <p className='text-slate-600 mb-6'>
//               Discover the best products with unbeatable quality and customer service.
//               Your satisfaction is our priority.
//             </p>
//             {/* Payment methods */}
//             <div className='space-y-4'>
//               <p className='text-slate-600 font-semibold'>100% secure SSL payment</p>
//               <div className='flex items-center justify-center md:justify-start space-x-4'>
//                 <FaCcVisa className='w-8 h-8 text-blue-950' />
//                 <FaCcMastercard className='w-8 h-8 text-red-600' />
//                 <FaCcPaypal className='w-8 h-8 text-blue-800' />
//               </div>
//             </div>
//           </div>
//           {/* Section 2: Links */}
//           <div className='mb-8 md:mb-0'>
//             <h3 className='font-bold mb-4'>Links</h3>
//             <div className='space-y-2'>
//               <Link
//                 href='/category/men'
//                 className='block text-slate-600 hover:text-slate-950 transition duration-300'
//               >
//                 Men
//               </Link>
//               <Link
//                 href='/category/women'
//                 className='block text-slate-600 hover:text-slate-950 transition duration-300'
//               >
//                 Women
//               </Link>
//               <Link
//                 href='/category/kid'
//                 className='block text-slate-600 hover:text-slate-950 transition duration-300'
//               >
//                 Kids
//               </Link>
//             </div>
//           </div>
//           {/* Section 3: Contact */}
//           <div className='mb-8 md:mb-0'>
//             <h3 className='font-bold mb-4'>Contact</h3>
//             <div className='space-y-2'>
//               <p className='flex items-center justify-center md:justify-start text-slate-600'>
//                 <FaEnvelope className='mr-2' />
//                 <span>info@tesloshop.com</span>
//               </p>
//               <p className='flex items-center justify-center md:justify-start text-slate-600'>
//                 <FaPhone className='mr-2' />
//                 <span>+1 234 567 890</span>
//               </p>
//               <p className='flex items-center justify-center md:justify-start text-slate-600'>
//                 <FaMapMarkerAlt className='mr-2' />
//                 <span>123 Fake Street, City, Country</span>
//               </p>
//             </div>
//           </div>
//           {/* Section 4: Social networks */}
//           <div className='mb-8 md:mb-0'>
//             <h3 className='font-bold mb-4'>Follow us</h3>
//             <div className='flex items-center justify-center md:justify-start space-x-4'>
//               <Link
//                 href='https://facebook.com'
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='text-slate-600 hover:text-slate-900 transition duration-300'
//               >
//                 <FaFacebook className='w-6 h-6' />
//               </Link>
//               <Link
//                 href='https://x.com'
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='text-slate-600 hover:text-slate-900 transition duration-300'
//               >
//                 <FaXTwitter className='w-6 h-6' />
//               </Link>
//               <Link
//                 href='https://instagram.com'
//                 target='_blank'
//                 rel='noopener noreferrer'
//                 className='text-slate-600 hover:text-slate-900 transition duration-300'
//               >
//                 <FaInstagram className='w-6 h-6' />
//               </Link>
//             </div>
//           </div>
//         </div>
//         {/* Copyright */}
//         <div className='border-t border-slate-200 mt-8 pt-8 text-center text-slate-600'>
//           <p>&copy; {new Date().getFullYear()} Teslo Shop. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

import Link from 'next/link';
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='py-8 border-t-2 border-slate-200 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='w-full flex flex-col md:flex-row justify-between gap-8 text-center md:text-left'>
          {/* Section 1: Brand info and payment methods */}
          <div className='mb-8 md:mb-0'>
            <h3 className='font-bold mb-4'>
              Teslo
              <span className='text-slate-500 hover:text-slate-700 transition-colors'>
                {' '}
                Shop
              </span>
            </h3>
            <p className='text-slate-600 mb-6'>
              Discover the best products with unbeatable quality and customer service.
              Your satisfaction is our priority.
            </p>
            {/* Payment methods */}
            <div className='space-y-4'>
              <p className='text-slate-600 font-semibold'>100% secure SSL payment</p>
              <div className='flex items-center justify-center md:justify-start space-x-4'>
                <FaCcVisa className='w-8 h-8 text-blue-950' aria-label='Visa' />
                <FaCcMastercard
                  className='w-8 h-8 text-red-600'
                  aria-label='Mastercard'
                />
                <FaCcPaypal className='w-8 h-8 text-blue-800' aria-label='PayPal' />
              </div>
            </div>
          </div>
          {/* Section 2: Quick links */}
          <div className='mb-8 md:mb-0'>
            <h3 className='font-bold mb-4'>Links</h3>
            <nav aria-label='Quick links'>
              <div className='space-y-2'>
                <Link
                  href='/category/men'
                  className='block text-slate-600 hover:text-slate-950 transition duration-300'
                  aria-label="Men's products"
                >
                  Men
                </Link>
                <Link
                  href='/category/women'
                  className='block text-slate-600 hover:text-slate-950 transition duration-300'
                  aria-label="Women's products"
                >
                  Women
                </Link>
                <Link
                  href='/category/kid'
                  className='block text-slate-600 hover:text-slate-950 transition duration-300'
                  aria-label="Kid's products"
                >
                  Kids
                </Link>
              </div>
            </nav>
          </div>
          {/* Section 3: Contact information */}
          <div className='mb-8 md:mb-0'>
            <h3 className='font-bold mb-4'>Contact Us</h3>
            <div className='space-y-2'>
              <p className='flex items-center justify-center md:justify-start text-slate-600'>
                <FaEnvelope className='mr-2' aria-hidden='true' />
                <span>info@tesloshop.com</span>
              </p>
              <p className='flex items-center justify-center md:justify-start text-slate-600'>
                <FaPhone className='mr-2' aria-hidden='true' />
                <span>+1 234 567 890</span>
              </p>
              <p className='flex items-center justify-center md:justify-start text-slate-600'>
                <FaMapMarkerAlt className='mr-2' aria-hidden='true' />
                <span>123 Fake Street, City, Country</span>
              </p>
            </div>
          </div>
          {/* Section 4: Social media links */}
          <div className='mb-8 md:mb-0'>
            <h3 className='font-bold mb-4'>Follow Us</h3>
            <div className='flex items-center justify-center md:justify-start space-x-2'>
              <Link
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-slate-600 hover:text-slate-900 transition duration-300'
                aria-label='Facebook'
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href='https://x.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-slate-600 hover:text-slate-900 transition duration-300'
                aria-label='Twitter'
              >
                <FaXTwitter size={24} />
              </Link>
              <Link
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-slate-600 hover:text-slate-900 transition duration-300'
                aria-label='Instagram'
              >
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className='border-t border-slate-200 mt-8 pt-8 text-center text-slate-600'>
          <p>&copy; {new Date().getFullYear()} Teslo Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
