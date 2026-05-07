// 'use client'

// import { usePathname } from "next/navigation"
// import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { assets } from "@/assets/assets"
// import { useUser } from "@clerk/nextjs"

// const AdminSidebar = () => {

//     const{user} =useUser();

//     const pathname = usePathname()

//     const sidebarLinks = [
//         { name: 'Dashboard', href: '/admin', icon: HomeIcon },
//         { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
//         { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
//         { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon  },
//     ]

//     return user && (
//         <div className="inline-flex h-full flex-col gap-5 border-r border-slate-200 sm:min-w-60">
//             <div className="flex flex-col gap-3 justify-center items-center pt-8 max-sm:hidden">
//                 <Image className="w-14 h-14 rounded-full" src={user.imageUrl} alt="" width={80} height={80} />
//                 <p className="text-slate-700">{user.fullName}</p>
//             </div>

//             <div className="max-sm:mt-6">
//                 {
//                     sidebarLinks.map((link, index) => (
//                         <Link key={index} href={link.href} className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${pathname === link.href && 'bg-slate-100 sm:text-slate-600'}`}>
//                             <link.icon size={18} className="sm:ml-5" />
//                             <p className="max-sm:hidden">{link.name}</p>
//                             {pathname === link.href && <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>}
//                         </Link>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default AdminSidebar


// 'use client'

// import { usePathname } from "next/navigation"
// import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useUser } from "@clerk/nextjs"

// const AdminSidebar = () => {
//   const { user } = useUser();
//   const pathname = usePathname();

//   const sidebarLinks = [
//     { name: 'Dashboard', href: '/admin', icon: HomeIcon },
//     { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
//     { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
//     { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon },
//   ];

//   return user && (
//     <>
//       {/* Desktop / Tablet Sidebar */}
//       <div className="hidden sm:inline-flex h-full flex-col gap-5 border-r border-slate-200 min-w-60">
//         <div className="flex flex-col gap-3 justify-center items-center pt-8">
//           <Image
//             className="w-14 h-14 rounded-full"
//             src={user.imageUrl}
//             alt="profile"
//             width={80}
//             height={80}
//           />
//           <p className="text-slate-700">{user.fullName}</p>
//         </div>

//         <div className="mt-6">
//           {sidebarLinks.map((link, index) => (
//             <Link
//               key={index}
//               href={link.href}
//               className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${pathname === link.href && 'bg-slate-100 text-slate-600'}`}
//             >
//               <link.icon size={18} className="ml-5" />
//               <p>{link.name}</p>
//               {pathname === link.href && (
//                 <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1.5 rounded-l"></span>
//               )}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Bottom Nav */}
//       <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center py-2 z-50">
//         {sidebarLinks.map((link, index) => (
//           <Link
//             key={index}
//             href={link.href}
//             className={`flex flex-col items-center text-xs transition ${
//               pathname === link.href ? 'text-green-600' : 'text-slate-500'
//             }`}
//           >
//             <link.icon size={20} />
//             <span>{link.name}</span>
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;

'use client'

import { usePathname } from "next/navigation"
import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

const AdminSidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
    { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
    { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon },
  ];

  return user && (
    <>
      {/* Desktop / Tablet Sidebar */}
      <div className="hidden sm:inline-flex h-full flex-col gap-5 border-r border-slate-200 min-w-60">
        <div className="flex flex-col gap-3 justify-center items-center pt-8">
          <Image
            className="w-14 h-14 rounded-full"
            src={user.imageUrl}
            alt="profile"
            width={80}
            height={80}
          />
          <p className="text-slate-700">{user.fullName}</p>
        </div>

        <div className="mt-6">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${pathname === link.href && 'bg-slate-100 text-slate-600'}`}
            >
              <link.icon size={18} className="ml-5" />
              <p>{link.name}</p>
              {pathname === link.href && (
                <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1.5 rounded-l"></span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Nav - Card Style */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-slate-50 border-t border-slate-200 px-3 py-2 z-50">
        <div className="grid grid-cols-4 gap-2">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`flex flex-col items-center justify-center rounded-xl p-2 transition shadow-sm ${
                pathname === link.href 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <link.icon size={20} />
              <span className="text-[11px] mt-1 font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
