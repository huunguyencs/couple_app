import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages";
import Milestones from "./pages/Milestones";
import NotFound from "./pages/NotFound";
import Restaurants from "./pages/Restaurants";
import TodoList from "./pages/TodoList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
          <div className="flex-1 overflow-y-auto pb-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/milestones" element={<Milestones />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/todos" element={<TodoList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Navigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
