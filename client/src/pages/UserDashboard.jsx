// // src/pages/UserDashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import styles from "./UserDashboard.module.css";
// import Order from "./Orders"; // <-- ensure you have this component

// const UserDashboard = () => {
//   const { user } = useAuth(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;

//       try {
//         setError("");
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/orders/my-orders`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("Fetched orders:", res.data);
//         setOrders(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err.response?.data || err.message);
//         setError("Failed to load your orders. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className={styles.dashboard}>
//         <div className={styles.container}>
//           <div className={styles.loading}>Loading your orders...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboard}>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <h1>My Dashboard</h1>
//           <p>Welcome back, {user?.name || user?.email}!</p>
//         </div>

//         <div className={styles.dashboardContent}>
//           {/* Sidebar */}
//           <div className={styles.sidebar}>
//             <div className={styles.sidebarSection}>
//               <h3>Quick Stats</h3>
//               <div className={styles.stats}>
//                 <div className={styles.statItem}>
//                   <span className={styles.statNumber}>{orders.length}</span>
//                   <span className={styles.statLabel}>Total Orders</span>
//                 </div>
//                 <div className={styles.statItem}>
//                   <span className={styles.statNumber}>
//                     {orders.filter((o) => o.paymentStatus === "completed").length}
//                   </span>
//                   <span className={styles.statLabel}>Completed</span>
//                 </div>
//               </div>
//             </div>

//             <div className={styles.sidebarSection}>
//               <h3>Account Info</h3>
//               <div className={styles.accountInfo}>
//                 <p><strong>Email:</strong> {user?.email}</p>
//                 <p>
//                   <strong>Member since:</strong>{" "}
//                   {user?.createdAt
//                     ? new Date(user.createdAt).toLocaleDateString()
//                     : "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Main content */}
//           <div className={styles.mainContent}>
//             <div className={styles.section}>
//               <h2>My Orders</h2>
//               {error && <div className={styles.error}>{error}</div>}

//               {orders.length === 0 ? (
//                 <div className={styles.emptyState}>
//                   <h3>No orders yet</h3>
//                   <p>You haven&apos;t placed any orders. Start shopping to see your orders here!</p>
//                   <a href="/" className={styles.ctaButton}>Browse Books</a>
//                 </div>
//               ) : (
//                 <div className={styles.ordersList}>
//                 <Order />
//                   {/* {orders.map((order) => (
//                     <Order key={order._id} order={order} />
//                   ))} */}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import styles from "./UserDashboard.module.css";
// import Order from "./Orders";

// const UserDashboard = () => {
//   const { user } = useAuth(); 
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("overview");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;

//       try {
//         setError("");
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/orders/my-orders`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("Fetched orders:", res.data);
//         setOrders(res.data.data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err.response?.data || err.message);
//         setError("Failed to load your orders. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   // Calculate stats
//   const totalOrders = orders.length;
//   const completedOrders = orders.filter(order => order.paymentStatus === "completed").length;
//   const pendingOrders = orders.filter(order => order.paymentStatus === "pending").length;
//   const totalSpent = orders.reduce((total, order) => total + (order.totalAmount || 0), 0);

//   if (loading) {
//     return (
//       <div className={styles.dashboard}>
//         <div className={styles.container}>
//           <div className={styles.loadingContainer}>
//             <div className={styles.loadingSpinner}></div>
//             <p>Loading your dashboard...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboard}>
//       <div className={styles.container}>
//         {/* Header */}
//         <div className={styles.header}>
//           <div className={styles.headerContent}>
//             <h1>My Dashboard</h1>
//             <p>Welcome back, {user?.name || user?.email}! 👋</p>
//           </div>
//           <div className={styles.headerActions}>
//             <span className={styles.userBadge}>
//               <span className={styles.userAvatar}>
//                 {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
//               </span>
//               {user?.name || user?.email}
//             </span>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className={styles.statsGrid}>
//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <span>📦</span>
//             </div>
//             <div className={styles.statContent}>
//               <h3>{totalOrders}</h3>
//               <p>Total Orders</p>
//             </div>
//           </div>

//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <span>✅</span>
//             </div>
//             <div className={styles.statContent}>
//               <h3>{completedOrders}</h3>
//               <p>Completed</p>
//             </div>
//           </div>

//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <span>⏳</span>
//             </div>
//             <div className={styles.statContent}>
//               <h3>{pendingOrders}</h3>
//               <p>Pending</p>
//             </div>
//           </div>

//           <div className={styles.statCard}>
//             <div className={styles.statIcon}>
//               <span>💰</span>
//             </div>
//             <div className={styles.statContent}>
//               <h3>${totalSpent.toFixed(2)}</h3>
//               <p>Total Spent</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className={styles.mainLayout}>
//           {/* Sidebar */}
//           <div className={styles.sidebar}>
//             <div className={styles.sidebarSection}>
//               <h3>Navigation</h3>
//               <nav className={styles.sidebarNav}>
//                 <button 
//                   className={`${styles.navItem} ${activeTab === "overview" ? styles.active : ""}`}
//                   onClick={() => setActiveTab("overview")}
//                 >
//                   <span className={styles.navIcon}>📊</span>
//                   Overview
//                 </button>
//                 <button 
//                   className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
//                   onClick={() => setActiveTab("orders")}
//                 >
//                   <span className={styles.navIcon}>📦</span>
//                   My Orders
//                 </button>
//                 <button 
//                   className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
//                   onClick={() => setActiveTab("profile")}
//                 >
//                   <span className={styles.navIcon}>👤</span>
//                   Profile
//                 </button>
//                 <button 
//                   className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
//                   onClick={() => setActiveTab("settings")}
//                 >
//                   <span className={styles.navIcon}>⚙️</span>
//                   Settings
//                 </button>
//               </nav>
//             </div>

//             <div className={styles.sidebarSection}>
//               <h3>Account Info</h3>
//               <div className={styles.accountInfo}>
//                 <div className={styles.infoItem}>
//                   <span className={styles.infoLabel}>Email:</span>
//                   <span className={styles.infoValue}>{user?.email}</span>
//                 </div>
//                 <div className={styles.infoItem}>
//                   <span className={styles.infoLabel}>Member since:</span>
//                   <span className={styles.infoValue}>
//                     {user?.createdAt
//                       ? new Date(user.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className={styles.sidebarSection}>
//               <h3>Quick Actions</h3>
//               <div className={styles.quickActions}>
//                 <a href="/books" className={styles.quickAction}>
//                   <span>🛒</span>
//                   Shop Books
//                 </a>
//                 <a href="/contact" className={styles.quickAction}>
//                   <span>📞</span>
//                   Contact Support
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className={styles.contentArea}>
//             {error && (
//               <div className={styles.errorBanner}>
//                 <span>⚠️</span>
//                 {error}
//               </div>
//             )}

//             {activeTab === "overview" && (
//               <div className={styles.tabContent}>
//                 <div className={styles.sectionHeader}>
//                   <h2>Overview</h2>
//                   <p>Your recent activity and statistics</p>
//                 </div>

//                 {orders.length === 0 ? (
//                   <div className={styles.emptyState}>
//                     <div className={styles.emptyIllustration}>📚</div>
//                     <h3>No orders yet</h3>
//                     <p>You haven't placed any orders. Start shopping to see your orders here!</p>
//                     <a href="/" className={styles.ctaButton}>
//                       Browse Books
//                     </a>
//                   </div>
//                 ) : (
//                   <div className={styles.overviewContent}>
//                     <div className={styles.recentActivity}>
//                       <h4>Recent Orders</h4>
//                       <div className={styles.activityList}>
//                         {orders.slice(0, 3).map((order) => (
//                           <div key={order._id} className={styles.activityItem}>
//                             <span className={styles.activityIcon}>📦</span>
//                             <div className={styles.activityDetails}>
//                               <p>Order #{order._id?.slice(-6)}</p>
//                               <span className={styles.activityDate}>
//                                 {new Date(order.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                             <span className={`${styles.activityStatus} ${styles[order.paymentStatus]}`}>
//                               {order.paymentStatus}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === "orders" && (
//               <div className={styles.tabContent}>
//                 <div className={styles.sectionHeader}>
//                   <h2>My Orders</h2>
//                   <p>Your complete order history</p>
//                 </div>

//                 {orders.length === 0 ? (
//                   <div className={styles.emptyState}>
//                     <div className={styles.emptyIllustration}>📦</div>
//                     <h3>No orders yet</h3>
//                     <p>You haven't placed any orders. Start shopping to see your orders here!</p>
//                     <a href="/" className={styles.ctaButton}>
//                       Browse Books
//                     </a>
//                   </div>
//                 ) : (
//                   <div className={styles.ordersSection}>
//                     <Order />
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === "profile" && (
//               <div className={styles.tabContent}>
//                 <div className={styles.sectionHeader}>
//                   <h2>Profile</h2>
//                   <p>Manage your account information</p>
//                 </div>
//                 <div className={styles.profileContent}>
//                   <div className={styles.profileCard}>
//                     <h4>Personal Information</h4>
//                     <div className={styles.profileInfo}>
//                       <div className={styles.infoRow}>
//                         <label>Full Name</label>
//                         <span>{user?.name || "Not provided"}</span>
//                       </div>
//                       <div className={styles.infoRow}>
//                         <label>Email</label>
//                         <span>{user?.email}</span>
//                       </div>
//                       <div className={styles.infoRow}>
//                         <label>Member Since</label>
//                         <span>
//                           {user?.createdAt
//                             ? new Date(user.createdAt).toLocaleDateString()
//                             : "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "settings" && (
//               <div className={styles.tabContent}>
//                 <div className={styles.sectionHeader}>
//                   <h2>Settings</h2>
//                   <p>Configure your account preferences</p>
//                 </div>
//                 <div className={styles.settingsContent}>
//                   <div className={styles.settingsCard}>
//                     <h4>Notification Preferences</h4>
//                     <p>Manage how you receive updates about your orders and account.</p>
//                   </div>
//                   <div className={styles.settingsCard}>
//                     <h4>Privacy Settings</h4>
//                     <p>Control your data and privacy preferences.</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import styles from "./UserDashboard.module.css";
import Order from "./Orders";

const UserDashboard = () => {
  const { user } = useAuth(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setError("");
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/my-orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched orders:", res.data);
        setOrders(res.data.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data || err.message);
        setError("Failed to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when a tab is selected on mobile
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Calculate stats
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.paymentStatus === "completed").length;
  const pendingOrders = orders.filter(order => order.paymentStatus === "pending").length;
  const totalSpent = orders.reduce((total, order) => total + (order.totalAmount || 0), 0);

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* Mobile Header with Hamburger */}
        <div className={styles.mobileHeader}>
          <button 
            className={styles.hamburger}
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1>My Dashboard</h1>
          <div className={styles.userBadge}>
            <span className={styles.userAvatar}>
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>My Dashboard</h1>
            <p>Welcome back, {user?.name || user?.email}! 👋</p>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.userBadge}>
              <span className={styles.userAvatar}>
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
              {user?.name || user?.email}
            </span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <span>📦</span>
            </div>
            <div className={styles.statContent}>
              <h3>{totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <span>✅</span>
            </div>
            <div className={styles.statContent}>
              <h3>{completedOrders}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <span>⏳</span>
            </div>
            <div className={styles.statContent}>
              <h3>{pendingOrders}</h3>
              <p>Pending</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <span>💰</span>
            </div>
            <div className={styles.statContent}>
              <h3>${totalSpent.toFixed(2)}</h3>
              <p>Total Spent</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainLayout}>
          {/* Sidebar Overlay for Mobile */}
          {isSidebarOpen && (
            <div 
              className={styles.sidebarOverlay}
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarSection}>
              <h3>Navigation</h3>
              <nav className={styles.sidebarNav}>
                <button 
                  className={`${styles.navItem} ${activeTab === "overview" ? styles.active : ""}`}
                  onClick={() => handleTabClick("overview")}
                >
                  <span className={styles.navIcon}>📊</span>
                  Overview
                </button>
                <button 
                  className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
                  onClick={() => handleTabClick("orders")}
                >
                  <span className={styles.navIcon}>📦</span>
                  My Orders
                </button>
                <button 
                  className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
                  onClick={() => handleTabClick("profile")}
                >
                  <span className={styles.navIcon}>👤</span>
                  Profile
                </button>
                <button 
                  className={`${styles.navItem} ${activeTab === "settings" ? styles.active : ""}`}
                  onClick={() => handleTabClick("settings")}
                >
                  <span className={styles.navIcon}>⚙️</span>
                  Settings
                </button>
              </nav>
            </div>

            <div className={styles.sidebarSection}>
              <h3>Account Info</h3>
              <div className={styles.accountInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>{user?.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Member since:</span>
                  <span className={styles.infoValue}>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3>Quick Actions</h3>
              <div className={styles.quickActions}>
                <a href="/books" className={styles.quickAction}>
                  <span>🛒</span>
                  Shop Books
                </a>
                <a href="/contact" className={styles.quickAction}>
                  <span>📞</span>
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className={styles.contentArea}>
            {error && (
              <div className={styles.errorBanner}>
                <span>⚠️</span>
                {error}
              </div>
            )}

            {activeTab === "overview" && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2>Overview</h2>
                  <p>Your recent activity and statistics</p>
                </div>

                {orders.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIllustration}>📚</div>
                    <h3>No orders yet</h3>
                    <p>You haven't placed any orders. Start shopping to see your orders here!</p>
                    <a href="/" className={styles.ctaButton}>
                      Browse Books
                    </a>
                  </div>
                ) : (
                  <div className={styles.overviewContent}>
                    <div className={styles.recentActivity}>
                      <h4>Recent Orders</h4>
                      <div className={styles.activityList}>
                        {orders.slice(0, 3).map((order) => (
                          <div key={order._id} className={styles.activityItem}>
                            <span className={styles.activityIcon}>📦</span>
                            <div className={styles.activityDetails}>
                              <p>Order #{order._id?.slice(-6)}</p>
                              <span className={styles.activityDate}>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <span className={`${styles.activityStatus} ${styles[order.paymentStatus]}`}>
                              {order.paymentStatus}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2>My Orders</h2>
                  <p>Your complete order history</p>
                </div>

                {orders.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIllustration}>📦</div>
                    <h3>No orders yet</h3>
                    <p>You haven't placed any orders. Start shopping to see your orders here!</p>
                    <a href="/" className={styles.ctaButton}>
                      Browse Books
                    </a>
                  </div>
                ) : (
                  <div className={styles.ordersSection}>
                    <Order />
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2>Profile</h2>
                  <p>Manage your account information</p>
                </div>
                <div className={styles.profileContent}>
                  <div className={styles.profileCard}>
                    <h4>Personal Information</h4>
                    <div className={styles.profileInfo}>
                      <div className={styles.infoRow}>
                        <label>Full Name</label>
                        <span>{user?.name || "Not provided"}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <label>Email</label>
                        <span>{user?.email}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <label>Member Since</label>
                        <span>
                          {user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className={styles.tabContent}>
                <div className={styles.sectionHeader}>
                  <h2>Settings</h2>
                  <p>Configure your account preferences</p>
                </div>
                <div className={styles.settingsContent}>
                  <div className={styles.settingsCard}>
                    <h4>Notification Preferences</h4>
                    <p>Manage how you receive updates about your orders and account.</p>
                  </div>
                  <div className={styles.settingsCard}>
                    <h4>Privacy Settings</h4>
                    <p>Control your data and privacy preferences.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;