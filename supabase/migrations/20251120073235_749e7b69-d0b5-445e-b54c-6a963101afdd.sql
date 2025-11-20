-- Create budgets table
CREATE TABLE IF NOT EXISTS public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT NOT NULL,
  fiscal_year TEXT NOT NULL,
  document_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on budgets
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for budgets
-- Everyone can view budgets (public transparency)
CREATE POLICY "Anyone can view budgets"
  ON public.budgets
  FOR SELECT
  USING (true);

-- Only admins can insert budgets
CREATE POLICY "Admins can insert budgets"
  ON public.budgets
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update budgets
CREATE POLICY "Admins can update budgets"
  ON public.budgets
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete budgets
CREATE POLICY "Admins can delete budgets"
  ON public.budgets
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_budgets_updated_at
  BEFORE UPDATE ON public.budgets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create complaints table
CREATE TABLE IF NOT EXISTS public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  department TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  citizen_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_authority_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on complaints
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- RLS Policies for complaints
-- Citizens can view their own complaints
CREATE POLICY "Citizens can view their own complaints"
  ON public.complaints
  FOR SELECT
  USING (auth.uid() = citizen_id);

-- Authorities and admins can view all complaints
CREATE POLICY "Authorities and admins can view all complaints"
  ON public.complaints
  FOR SELECT
  USING (
    has_role(auth.uid(), 'authority'::app_role) OR 
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'ngo'::app_role)
  );

-- Citizens can insert their own complaints
CREATE POLICY "Citizens can insert complaints"
  ON public.complaints
  FOR INSERT
  WITH CHECK (auth.uid() = citizen_id);

-- Authorities and admins can update complaints
CREATE POLICY "Authorities and admins can update complaints"
  ON public.complaints
  FOR UPDATE
  USING (
    has_role(auth.uid(), 'authority'::app_role) OR 
    has_role(auth.uid(), 'admin'::app_role)
  );

-- Add trigger for updated_at
CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();