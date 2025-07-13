import { Link, useLocation } from "react-router-dom";
import { 
  UserCheck,
  Users,
  Clipboard,
  ShoppingCart,
} from "lucide-react";

const cardData = [
{
    title: "Total Workers",
    amount: 24,
    icon: UserCheck,
},
{
  title: "Total Users",
  amount: 56,
  icon: Users,
},
{
  title: "Assignments",
  amount: 32,
  icon: Clipboard,
},
{
  title: "Orders",
  amount: 75,
  icon: ShoppingCart
}

];



export const CardHolderSm = ({ cardIndex = 0 }) => {
  const item = cardData[cardIndex];
  const Icon = item.icon; 

  return (
    <div className='bg-white shadow-lg rounded-xl border border-gray-200 h-[140px] w-[276px] p-5'>
      <div className="flex flex-row justify-between items-start">
        <p className='text-gray-700 mt-2'>{item.title}</p>
        <div className="flex items-center justify-center h-10 w-10 bg-cbvt-navy rounded-lg">
          <Icon className="h-5 w-5 text-blue-200" />
        </div>
      </div>
      <p className='text-cbvt-navy font-alegreya-sans-sc text-3xl font-bold mt-3'>
        {item.amount}
      </p>
    </div>
  );
};