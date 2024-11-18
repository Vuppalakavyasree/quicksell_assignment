// import React, { useEffect, useState } from "react";
// import "./TicketManagementApp.css";

// const TicketManagementApp = () => {
//   const [tickets, setTickets] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [groupBy, setGroupBy] = useState("status"); // Default grouping by status
//   const [orderBy, setOrderBy] = useState("priority"); // Default ordering by priority

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment"); // Replace with actual API URL
//         const data = await response.json();
//         setTickets(data.tickets);
//         setUsers(data.users);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getUserById = (userId) => users.find((user) => user.id === userId);

//   // Group tickets based on groupBy state
//   const groupTickets = () => {
//     if (groupBy === "status") {
//       return tickets.reduce((groups, ticket) => {
//         const status = ticket.status;
//         if (!groups[status]) groups[status] = [];
//         groups[status].push(ticket);
//         return groups;
//       }, {});
//     } else if (groupBy === "user") {
//       return tickets.reduce((groups, ticket) => {
//         const user = getUserById(ticket.userId)?.name || "Unknown";
//         if (!groups[user]) groups[user] = [];
//         groups[user].push(ticket);
//         return groups;
//       }, {});
//     } else if (groupBy === "priority") {
//       const priorityMap = {
//         0: { label: "No Priority", icon: "/icons/priority0.svg" },
//         1: { label: "Low", icon: "/icons/priority1.svg" },
//         2: { label: "Medium", icon: "/icons/priority2.svg" },
//         3: { label: "High", icon: "/icons/priority3.svg" },
//         4: { label: "Urgent", icon: "/icons/priority4.svg" },
//       };

//       return tickets.reduce((groups, ticket) => {
//         const priority = priorityMap[ticket.priority] || {
//           label: "Unknown",
//           icon: "/icons/default.svg",
//         };
//         const groupKey = JSON.stringify(priority); // Use a JSON string to maintain both icon and label
//         if (!groups[groupKey]) groups[groupKey] = [];
//         groups[groupKey].push(ticket);
//         return groups;
//       }, {});
//     }
//   };

//   // Order tickets based on orderBy state
//   const orderTickets = (groupedTickets) => {
//     const sortedTickets = { ...groupedTickets };

//     Object.keys(sortedTickets).forEach((group) => {
//       sortedTickets[group] = sortedTickets[group].sort((a, b) => {
//         if (orderBy === "priority") {
//           return b.priority - a.priority; // Descending priority
//         } else if (orderBy === "title") {
//           return a.title.localeCompare(b.title); // Ascending title
//         }
//         return 0;
//       });
//     });

//     return sortedTickets;
//   };

//   const groupedTickets = orderTickets(groupTickets());

//   return (
//     <div className="container">
//       <h1>Ticket Management System</h1>
//       {/* Dropdown Menu */}
//       <div className="dropdown-container">
//         <label htmlFor="display-options">Display:</label>
//         <select
//           id="display-options"
//           onChange={(e) => setGroupBy(e.target.value)}
//           value={groupBy}
//         >
//           <option value="status">Group by Status</option>
//           <option value="user">Group by User</option>
//           <option value="priority">Group by Priority</option>
//         </select>

//         <label htmlFor="order-options">Order:</label>
//         <select
//           id="order-options"
//           onChange={(e) => setOrderBy(e.target.value)}
//           value={orderBy}
//         >
//           <option value="priority">Order by Priority</option>
//           <option value="title">Order by Title</option>
//         </select>
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {Object.entries(groupedTickets).map(([groupKey, tickets]) => {
//             const group = JSON.parse(groupKey); // Parse group key to access icon and label
//             return (
//               <div key={group.label} className="group-section">
//                 <h2>
//                   <img
//                     src={group.icon}
//                     alt={group.label}
//                     className="priority-icon"
//                   />
//                   {group.label}
//                 </h2>
//                 <div className="tickets-grid">
//                   {tickets.map((ticket) => (
//                     <div key={ticket.id} className="card">
//                       <div className="card-header">
//                         <span className="card-id">{ticket.id}</span>
//                         <img
//                           src={
//                             getUserById(ticket.userId)?.profileImage ||
//                             "/profile-placeholder.png"
//                           }
//                           alt="User Profile"
//                           className="profile-img"
//                         />
//                       </div>
//                       <h2 className="card-title">{ticket.title}</h2>
//                       <div className="card-footer">
//                         <div className="icon-container">
//                           <img
//                             src={`/icons/priority${ticket.priority}.svg`}
//                             alt={`Priority ${ticket.priority}`}
//                             className="priority-icon"
//                           />
//                         </div>
//                         {ticket.tag.map((tag, index) => (
//                           <span key={index} className="tag">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketManagementApp;






















import React, { useEffect, useState } from "react";
import "./TicketManagementApp.css";
const TicketManagementApp = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupBy, setGroupBy] = useState("status"); // Default grouping by status
  const [orderBy, setOrderBy] = useState("priority"); // Default ordering by priority
  const [mainDropdown, setMainDropdown] = useState(""); // Tracks the main dropdown selection
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment"); // Replace with actual API URL
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserById = (userId) => users.find((user) => user.id === userId);

  // Group tickets based on groupBy state
  const groupTickets = () => {
    if (groupBy === "status") {
      return tickets.reduce((groups, ticket) => {
        const status = ticket.status;
        if (!groups[status]) groups[status] = [];
        groups[status].push(ticket);
        return groups;
      }, {});
    } else if (groupBy === "user") {
      return tickets.reduce((groups, ticket) => {
        const user = getUserById(ticket.userId)?.name || "Unknown";
        if (!groups[user]) groups[user] = [];
        groups[user].push(ticket);
        return groups;
      }, {});
    } else if (groupBy === "priority") {

      return tickets.reduce((groups, ticket) => 
      {
        const priorityMap = {
        0: { label: "No Priority", icon: "/icons/priority0.svg" },
        1: { label: "Low", icon: "/icons/priority1.svg" },
        2: { label: "Medium", icon: "/icons/priority2.svg" },
        3: { label: "High", icon: "/icons/priority3.svg" },
        4: { label: "Urgent", icon: "/icons/priority4.svg" },
        };

        const priorityLabel = priorityMap[ticket.priority]?.label || "Unknown";
        const priorityIcon = priorityMap[ticket.priority]?.icon || "/icons/default.svg";
        const groupKey = `${priorityIcon} ${priorityLabel}`;
          if (!groups[groupKey]) groups[groupKey] = [];
          groups[groupKey].push(ticket);

        return groups;
        
      }, {});

      
    }
  };

  // Order tickets based on orderBy state
  const orderTickets = (groupedTickets) => {
    const sortedTickets = { ...groupedTickets };

    Object.keys(sortedTickets).forEach((group) => {
      sortedTickets[group] = sortedTickets[group].sort((a, b) => {
        if (orderBy === "priority") {
          return b.priority - a.priority; // Descending priority
        } else if (orderBy === "title") {
          return a.title.localeCompare(b.title); // Ascending title
        }
        return 0;
      });
    });

    return sortedTickets;
  };

  const groupedTickets = orderTickets(groupTickets());


  
  return (
  <div className="container">
    <h1>Quick Sell Ticket Management System</h1>
    {/* Dropdown Menu */}
    {/* <div className="dropdown-container">
      <label htmlFor="display-options">Display:</label>
      <select
        id="display-options"
        onChange={(e) => setGroupBy(e.target.value)}
        value={groupBy}
      >
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>

      <label htmlFor="order-options">Order:</label>
      <select
        id="order-options"
        onChange={(e) => setOrderBy(e.target.value)}
        value={orderBy}
      >
        <option value="priority">Order by Priority</option>
        <option value="title">Order by Title</option>
      </select>
    </div> */}
    <div className="dropdown-container">
  <label htmlFor="main-display-options">Display:</label>
  <select
    id="main-display-options"
    onChange={(e) => setMainDropdown(e.target.value)}
    value={mainDropdown}
  >
    <option value="">Select</option>
    <option value="group">Group Options</option>
    <option value="order">Order Options</option>
  </select>

  {mainDropdown === "group" && (
    <div className="nested-dropdown">
      <label htmlFor="group-options">Group by:</label>
      <select
        id="group-options"
        onChange={(e) => setGroupBy(e.target.value)}
        value={groupBy}
      >
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  )}

  {mainDropdown === "order" && (
    <div className="nested-dropdown">
      <label htmlFor="order-options">Order by:</label>
      <select
        id="order-options"
        onChange={(e) => setOrderBy(e.target.value)}
        value={orderBy}
      >
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  )}
</div>



    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {Object.entries(groupedTickets).map(([group, tickets]) => (
          <div key={group} className="group-section">

            <h2>{group}</h2>
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="card">
                  <div className="card-header">
                    <span className="card-id">{ticket.id}</span>
                    <img
                      src={getUserById(ticket.userId)?.profileImage || "/profile-placeholder.png"}
                      alt="User Profile"
                      className="profile-img"
                    />
                  </div>
                  <h2 className="card-title">{ticket.title}</h2>
                  <div className="card-footer">
                    <div className="icon-container">
                      <img
                        src={`/icons/priority${ticket.priority}.svg`}
                        alt={`Priority ${ticket.priority}`}
                        className="priority-icon"
                      />
                    </div>
                    {ticket.tag.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default TicketManagementApp;
