import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

import Landing from '@/pages/landing';
import Blueprint from '@/pages/blueprint';
import Demo from '@/pages/demo';
import Architecture from '@/pages/architecture';
import Personas from '@/pages/personas';
import Roadmap from '@/pages/roadmap';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/blueprint" component={Blueprint} />
        <Route path="/demo" component={Demo} />
        <Route path="/chat" component={Demo} />
        <Route path="/architecture" component={Architecture} />
        <Route path="/personas" component={Personas} />
        <Route path="/roadmap" component={Roadmap} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
