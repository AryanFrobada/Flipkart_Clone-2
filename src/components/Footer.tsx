import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 text-sm">

          {/* ABOUT SECTION */}
          <div>
            <h3 className="font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:underline">About Us</Link></li>
              <li><Link href="#" className="hover:underline">Careers</Link></li>
              <li><Link href="#" className="hover:underline">Flipkart Stories</Link></li>
              <li><Link href="#" className="hover:underline">Press</Link></li>
              <li><Link href="#" className="hover:underline">Flipkart Wholesale</Link></li>
              <li><Link href="#" className="hover:underline">Corporate Information</Link></li>
            </ul>
          </div>

          {/* HELP SECTION */}
          <div>
            <h3 className="font-semibold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Payments</Link></li>
              <li><Link href="#" className="hover:underline">Shipping</Link></li>
              <li><Link href="#" className="hover:underline">Cancellation & Returns</Link></li>
              <li><Link href="#" className="hover:underline">FAQ</Link></li>
              <li><Link href="#" className="hover:underline">Report Infringement</Link></li>
            </ul>
          </div>

          {/* POLICY SECTION */}
          <div>
            <h3 className="font-semibold mb-4">POLICY</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Return Policy</Link></li>
              <li><Link href="#" className="hover:underline">Terms Of Use</Link></li>
              <li><Link href="#" className="hover:underline">Security</Link></li>
              <li><Link href="#" className="hover:underline">Privacy</Link></li>
              <li><Link href="#" className="hover:underline">Sitemap</Link></li>
              <li><Link href="#" className="hover:underline">EPR Compliance</Link></li>
            </ul>
          </div>

          {/* SOCIAL SECTION */}
          <div>
            <h3 className="font-semibold mb-4">SOCIAL</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Facebook</Link></li>
              <li><Link href="#" className="hover:underline">Twitter</Link></li>
              <li><Link href="#" className="hover:underline">YouTube</Link></li>
            </ul>
          </div>

          {/* MAIL US SECTION */}
          <div>
            <h3 className="font-semibold mb-4">Mail Us:</h3>
            <p className="text-sm text-gray-400">
              Flipkart Internet Private Limited,
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>

          {/* REGISTERED OFFICE ADDRESS SECTION */}
          <div>
            <h3 className="font-semibold mb-4">Registered Office Address:</h3>
            <p className="text-sm text-gray-400">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India<br />
              CIN: U51109KA2012PTC066107<br />
              Telephone: 044-45614700
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 Flipkart. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:underline">Sell On Flipkart</Link>
              <Link href="#" className="hover:underline">Advertise</Link>
              <Link href="#" className="hover:underline">Gift Cards</Link>
              <Link href="#" className="hover:underline">Help Center</Link>
              <Link href="#" className="hover:underline">© Flipkart</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
