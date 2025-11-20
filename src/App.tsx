import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import BudgetDetail from "./pages/BudgetDetail";
import ComplaintNew from "./pages/ComplaintNew";
import ComplaintStatus from "./pages/ComplaintStatus";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPostBudget from "./pages/AdminPostBudget";
import AdminCreateAuthority from "./pages/AdminCreateAuthority";
import AdminCreateNGO from "./pages/AdminCreateNGO";
import AdminCitizens from "./pages/AdminCitizens";
import AdminAuthorities from "./pages/AdminAuthorities";
import AdminComplaints from "./pages/AdminComplaints";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthorityComplaints from "./pages/AuthorityComplaints";
import AuthorityComplaintDetail from "./pages/authority/AuthorityComplaintDetail";
import AuthorityCompleted from "./pages/authority/AuthorityCompleted";
import AuthorityUploadReport from "./pages/authority/AuthorityUploadReport";
import AuthorityCommunication from "./pages/authority/AuthorityCommunication";
import NGODashboard from "./pages/NGODashboard";
import NGOReports from "./pages/NGOReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Citizen Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
            <Route path="/budgets/:id" element={<ProtectedRoute><BudgetDetail /></ProtectedRoute>} />
            <Route path="/complaint/new" element={<ProtectedRoute><ComplaintNew /></ProtectedRoute>} />
            <Route path="/complaint/status" element={<ProtectedRoute><ComplaintStatus /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/post-budget" element={<ProtectedRoute requiredRole={['admin']}><AdminPostBudget /></ProtectedRoute>} />
            <Route path="/admin/create-authority" element={<ProtectedRoute requiredRole={['admin']}><AdminCreateAuthority /></ProtectedRoute>} />
            <Route path="/admin/create-ngo" element={<ProtectedRoute requiredRole={['admin']}><AdminCreateNGO /></ProtectedRoute>} />
            <Route path="/admin/citizens" element={<ProtectedRoute requiredRole={['admin']}><AdminCitizens /></ProtectedRoute>} />
            <Route path="/admin/authorities" element={<ProtectedRoute requiredRole={['admin']}><AdminAuthorities /></ProtectedRoute>} />
            <Route path="/admin/complaints" element={<ProtectedRoute requiredRole={['admin']}><AdminComplaints /></ProtectedRoute>} />
            
            {/* Authority Routes */}
            <Route path="/authority/dashboard" element={<ProtectedRoute requiredRole={['authority']}><AuthorityDashboard /></ProtectedRoute>} />
            <Route path="/authority/complaints" element={<ProtectedRoute requiredRole={['authority']}><AuthorityComplaints /></ProtectedRoute>} />
            <Route path="/authority/complaint/:id" element={<ProtectedRoute requiredRole={['authority']}><AuthorityComplaintDetail /></ProtectedRoute>} />
            <Route path="/authority/completed" element={<ProtectedRoute requiredRole={['authority']}><AuthorityCompleted /></ProtectedRoute>} />
            <Route path="/authority/upload-report" element={<ProtectedRoute requiredRole={['authority']}><AuthorityUploadReport /></ProtectedRoute>} />
            <Route path="/authority/communication" element={<ProtectedRoute requiredRole={['authority']}><AuthorityCommunication /></ProtectedRoute>} />
            
            {/* NGO Routes */}
            <Route path="/ngo/dashboard" element={<ProtectedRoute requiredRole={['ngo']}><NGODashboard /></ProtectedRoute>} />
            <Route path="/ngo/reports" element={<ProtectedRoute requiredRole={['ngo']}><NGOReports /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
