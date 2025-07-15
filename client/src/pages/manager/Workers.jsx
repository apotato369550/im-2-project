import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { CardHolderMd } from "../../components/CardHolderMd";
import SortingDropdown from "../../components/SortingDropdown"

const WorkersPage = () => {
  const [activeItem, setActiveItem] = useState('Workers');

  //search function
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState([]);

  //filter function
   const [sortOption, setSortOption] = useState('default');


  const workerData=[
    {
    Name: "Marcus Chen",
    Position: "Lead Engineer",
    PhoneNumber: "+1 415 555 0192",
    Email: "marcus.chen@techcorp.com"
  },
  {
    Name: "Aisha Johnson",
    Position: "HR Manager",
    PhoneNumber: "+44 20 7946 0958",
    Email: "a.johnson@hrsuite.co.uk"
  },
  {
    Name: "Raj Patel",
    Position: "Financial Analyst",
    PhoneNumber: "+91 80 4123 4567",
    Email: "rpatel@financegroup.in"
  },
  {
    Name: "Sophie Müller",
    Position: "UX Designer",
    PhoneNumber: "+49 30 901820",
    Email: "s.muller@designstudio.de"
  },
  {
    Name: "Kwame Nkrumah",
    Position: "Operations Director",
    PhoneNumber: "+233 24 123 4567",
    Email: "kwame.n@africabiz.gh"
  },
  {
    Name: "Elena Rodriguez",
    Position: "Marketing Specialist",
    PhoneNumber: "+34 91 123 45 67",
    Email: "elena.rod@marketia.es"
  },
  {
    Name: "Yuki Tanaka",
    Position: "Software Developer",
    PhoneNumber: "+81 3 1234 5678",
    Email: "y.tanaka@devteam.jp"
  },
  {
    Name: "Olivia Smith",
    Position: "Customer Support Lead",
    PhoneNumber: "+1 646 555 0132",
    Email: "olivia.s@supportcenter.com"
  },
  {
    Name: "Mohammed Al-Farsi",
    Position: "Sales Executive",
    PhoneNumber: "+966 11 123 4567",
    Email: "m.alfarsi@gulfbusiness.sa"
  },
  {
    Name: "Isabella Rossi",
    Position: "Product Manager",
    PhoneNumber: "+39 02 1234 5678",
    Email: "i.rossi@productit.it"
  },
  {
    Name: "Jamal Washington",
    Position: "Quality Assurance",
    PhoneNumber: "+1 202 555 0189",
    Email: "j.washington@qateam.com"
  },
  {
    Name: "Priya Sharma",
    Position: "Data Scientist",
    PhoneNumber: "+91 11 2345 6789",
    Email: "priya.s@datainsights.in"
  },
  {
    Name: "Lucas Bergman",
    Position: "Scrum Master",
    PhoneNumber: "+46 8 123 456 78",
    Email: "lucas.b@agileteam.se"
  },
  {
    Name: "Fatima Zahra",
    Position: "Content Writer",
    PhoneNumber: "+212 6 12 34 56 78",
    Email: "f.zahra@contentcreators.ma"
  },
  {
    Name: "Daniel Kim",
    Position: "DevOps Engineer",
    PhoneNumber: "+82 2 1234 5678",
    Email: "daniel.k@cloudops.kr"
  },
  {
    Name: "Anastasia Petrov",
    Position: "Business Analyst",
    PhoneNumber: "+7 495 123 45 67",
    Email: "a.petrov@bizanalytics.ru"
  },
  {
    Name: "Carlos Mendez",
    Position: "Network Administrator",
    PhoneNumber: "+52 55 1234 5678",
    Email: "c.mendez@networks.mx"
  },
  {
    Name: "Nia Johnson",
    Position: "UI Designer",
    PhoneNumber: "+1 310 555 0167",
    Email: "nia.j@creativeui.com"
  },
  {
    Name: "Hiroshi Yamamoto",
    Position: "Systems Architect",
    PhoneNumber: "+81 90 1234 5678",
    Email: "hiroshi.y@sysdesign.jp"
  },
  {
    Name: "Amina Diallo",
    Position: "Project Coordinator",
    PhoneNumber: "+221 77 123 45 67",
    Email: "a.diallo@projects.sn"
  }
];

  // Initialize with all workers on first render
  useEffect(() => {
    setOutput(workerData);
  }, []);


 // Combined filter and sort effect
  useEffect(() => {
    // Apply search filter
    let results = workerData.filter(worker =>
      worker.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.Position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply sorting
    results = sortWorkers(results, sortOption);
    
    setOutput(results);
  }, [searchQuery, sortOption]); // Add sortOption to dependencies


// Sorting function
  const sortWorkers = (workers, option) => {
    const sorted = [...workers];
    switch(option) {
      case 'name-asc':
        return sorted.sort((a, b) => a.Name.localeCompare(b.Name));
      case 'name-desc':
        return sorted.sort((a, b) => b.Name.localeCompare(a.Name));
      default:
        return workers;
    }
  };
  

 

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy">
                {activeItem}
              </h1>
              <p className="text-cbvt-dark-gray mb-6">
                Manage your team.
              </p>
            </div>
            <button className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 '>
              <Plus className='h-3 w-3 mr-2' />
              <span className='text-xs'>Add New Worker</span>
            </button>
          </div>


          <div className='flex flex-row' > 
          {/* Search Bar */}
          <div className="mb-8">
            <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500'/>
              <input 
                type='text' 
                placeholder='Search workers...' 
                className='w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        <SortingDropdown 
            onSortChange={(sortValue) => setSortOption(sortValue)}
          />
        </div>

        



        </div>

        {/* Workers Grid */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="grid grid-cols-3 gap-5 mt-5">
            {output.map((worker) => (
            <CardHolderMd
            key={worker.Name}
            Name={worker.Name}
            Position={worker.Position}
            PhoneNumber={worker.PhoneNumber}
            Email={worker.Email}
            />

            
             ))}

            
          </div>
        </div>


        
      </div>
    </div>
  );
};

export default WorkersPage;