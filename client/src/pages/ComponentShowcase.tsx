import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  AlertCircle,
  CalendarIcon,
  Check,
  ChevronRight,
  Clock,
  Code,
  Copy,
  ExternalLink,
  Github,
  Layers,
  Loader2,
  Moon,
  Palette,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast as sonnerToast } from "sonner";
import { AIChatBox, type Message } from "@/components/AIChatBox";

interface Framework {
  value: string;
  label: string;
  description: string;
}

interface ComponentSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ComponentsShowcase() {
  const { theme, toggleTheme } = useTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [datePickerDate, setDatePickerDate] = useState<Date>();
  const [progress, setProgress] = useState(33);
  const [currentPage, setCurrentPage] = useState(2);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [dialogInput, setDialogInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // AI ChatBox demo state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { 
      role: "system", 
      content: "You are a helpful assistant demonstrating shadcn/ui components. Provide concise, informative responses about UI components and best practices." 
    },
    { 
      role: "assistant", 
      content: "Hello! I'm here to help you explore shadcn/ui components. Feel free to ask about any component or UI best practices!" 
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Component sections for navigation
  const sections: ComponentSection[] = useMemo(() => [
    { id: "colors", title: "Colors", description: "Text and background color combinations", icon: <Palette className="h-4 w-4" /> },
    { id: "buttons", title: "Buttons", description: "Button variants and states", icon: <Layers className="h-4 w-4" /> },
    { id: "forms", title: "Form Inputs", description: "Input fields and form controls", icon: <Code className="h-4 w-4" /> },
    { id: "data", title: "Data Display", description: "Tables, badges, and progress indicators", icon: <Layers className="h-4 w-4" /> },
    { id: "overlays", title: "Overlays", description: "Modals, dialogs, and popovers", icon: <Layers className="h-4 w-4" /> },
    { id: "navigation", title: "Navigation", description: "Menus, tabs, and breadcrumbs", icon: <ChevronRight className="h-4 w-4" /> },
    { id: "feedback", title: "Feedback", description: "Alerts, toasts, and skeletons", icon: <AlertCircle className="h-4 w-4" /> },
    { id: "layout", title: "Layout", description: "Grid, spacing, and responsive components", icon: <Layers className="h-4 w-4" /> },
    { id: "chat", title: "AI Chat", description: "Interactive chat interface", icon: <Search className="h-4 w-4" /> },
  ], []);

  // Frameworks for combobox
  const frameworks: Framework[] = useMemo(() => [
    { value: "react", label: "React", description: "A JavaScript library for building user interfaces" },
    { value: "vue", label: "Vue.js", description: "The Progressive JavaScript Framework" },
    { value: "angular", label: "Angular", description: "The modern web developer's platform" },
    { value: "svelte", label: "Svelte", description: "Cybernetically enhanced web apps" },
    { value: "nextjs", label: "Next.js", description: "The React Framework for Production" },
    { value: "nuxt", label: "Nuxt.js", description: "The Intuitive Vue Framework" },
    { value: "remix", label: "Remix", description: "A full stack web framework" },
  ], []);

  // Filter sections based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const query = searchQuery.toLowerCase();
    return sections.filter(section =>
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query)
    );
  }, [searchQuery, sections]);

  // Handle dialog submission
  const handleDialogSubmit = useCallback(() => {
    if (!dialogInput.trim()) {
      sonnerToast.warning("Input required", {
        description: "Please enter some text before submitting",
      });
      return;
    }

    console.log("Dialog submitted with value:", dialogInput);
    sonnerToast.success("Submitted successfully", {
      description: `Input: ${dialogInput}`,
      action: {
        label: "Copy",
        onClick: () => navigator.clipboard.writeText(dialogInput),
      },
    });
    setDialogInput("");
    setDialogOpen(false);
  }, [dialogInput]);

  // Handle keyboard events in dialog
  const handleDialogKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleDialogSubmit();
    }
  }, [handleDialogSubmit]);

  // Handle chat messages
  const handleChatSend = useCallback(async (content: string) => {
    // Add user message
    const newMessages: Message[] = [...chatMessages, { 
      role: "user", 
      content,
      timestamp: new Date().toISOString()
    }];
    setChatMessages(newMessages);

    // Simulate AI response with delay
    setIsChatLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const aiResponse: Message = {
        role: "assistant",
        content: `I received your message about **"${content}"**. 

**Example usage with shadcn/ui:**
\`\`\`tsx
// Using the Button component
<Button variant="default" size="lg">
  Click me
</Button>

// Using the Card component
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
\`\`\`

**Best practice tip:** Always use semantic HTML elements and ensure proper accessibility attributes when using UI components.`,
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      sonnerToast.error("Chat error", {
        description: "Failed to get AI response",
      });
    } finally {
      setIsChatLoading(false);
    }
  }, [chatMessages]);

  // Copy code snippet to clipboard
  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    sonnerToast.success("Copied!", {
      description: `${label} copied to clipboard`,
    });
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Calculate component statistics
  const componentStats = useMemo(() => ({
    totalComponents: sections.length,
    interactiveComponents: 8,
    formComponents: 6,
    displayComponents: 7,
  }), [sections.length]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Layers className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">UI Components</h1>
                  <p className="text-xs text-muted-foreground">
                    {componentStats.totalComponents} components • {componentStats.interactiveComponents} interactive
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden md:block w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search components..."
                    className="pl-9 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Button variant="outline" size="sm" asChild>
                  <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Docs
                  </a>
                </Button>

                <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar Navigation */}
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Components</CardTitle>
                    <CardDescription>
                      Browse all available UI components
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      <div className="space-y-1">
                        {filteredSections.map((section) => (
                          <Button
                            key={section.id}
                            variant={activeSection === section.id ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => {
                              document.getElementById(section.id)?.scrollIntoView({
                                behavior: 'smooth'
                              });
                            }}
                          >
                            <span className="mr-2">{section.icon}</span>
                            {section.title}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t pt-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-muted-foreground">
                        Built with shadcn/ui
                      </span>
                      <Button variant="ghost" size="icon" asChild>
                        <a href="https://github.com/shadcn-ui/ui" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 space-y-12">
              {/* Hero Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Component Library</h2>
                    <p className="text-muted-foreground">
                      A comprehensive collection of accessible, customizable UI components
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-medium">
                    v1.0.0
                  </Badge>
                </div>
              </section>

              {/* Colors Section */}
              <section id="colors" className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Colors & Theme
                    </h3>
                    <Badge variant="secondary">Design Tokens</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Text colors, background combinations, and theme variants
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Color Palette</CardTitle>
                    <CardDescription>
                      Semantic color system for consistent theming
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Text Colors */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Text Colors</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { name: "Foreground", className: "text-foreground", description: "Primary text color" },
                          { name: "Muted", className: "text-muted-foreground", description: "Secondary text" },
                          { name: "Primary", className: "text-primary", description: "Brand color text" },
                          { name: "Destructive", className: "text-destructive", description: "Error states" },
                        ].map((color) => (
                          <div key={color.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{color.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyToClipboard(color.className, `${color.name} class`)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className={cn("p-4 rounded-lg border", color.className)}>
                              <p className="text-sm">{color.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Background Combinations */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Background Combinations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { name: "Primary", bg: "bg-primary", text: "text-primary-foreground" },
                          { name: "Secondary", bg: "bg-secondary", text: "text-secondary-foreground" },
                          { name: "Accent", bg: "bg-accent", text: "text-accent-foreground" },
                          { name: "Destructive", bg: "bg-destructive", text: "text-destructive-foreground" },
                          { name: "Muted", bg: "bg-muted", text: "text-muted-foreground" },
                          { name: "Card", bg: "bg-card", text: "text-card-foreground", border: true },
                        ].map((combo) => (
                          <div
                            key={combo.name}
                            className={cn(
                              "p-4 rounded-lg transition-all hover:scale-[1.02]",
                              combo.bg,
                              combo.text,
                              combo.border && "border"
                            )}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{combo.name}</span>
                              <Badge variant="outline" className={combo.text}>
                                {combo.bg.replace('bg-', '')}
                              </Badge>
                            </div>
                            <p className="text-sm opacity-90">
                              Background with matching foreground text
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Buttons Section */}
              <section id="buttons" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Buttons</h3>
                  <p className="text-muted-foreground">
                    Various button styles, sizes, and states
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Button Variants</CardTitle>
                    <CardDescription>
                      Choose from multiple button styles for different contexts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Variants */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Variants</h4>
                      <div className="flex flex-wrap gap-3">
                        {["default", "secondary", "destructive", "outline", "ghost", "link"].map((variant) => (
                          <div key={variant} className="flex flex-col items-center gap-2">
                            <Button variant={variant as any}>
                              {variant.charAt(0).toUpperCase() + variant.slice(1)}
                            </Button>
                            <code className="text-xs text-muted-foreground">variant="{variant}"</code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Sizes</h4>
                      <div className="flex flex-wrap items-center gap-3">
                        {["sm", "default", "lg", "icon"].map((size) => (
                          <div key={size} className="flex flex-col items-center gap-2">
                            <Button size={size as any}>
                              {size === "icon" ? <Check className="h-4 w-4" /> : size.toUpperCase()}
                            </Button>
                            <code className="text-xs text-muted-foreground">size="{size}"</code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* States */}
                    <div className="space-y-4">
                      <h4 className="font-medium">States</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button disabled>Disabled</Button>
                        <Button>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading
                        </Button>
                        <Button variant="outline" className="relative overflow-hidden">
                          <span className="relative z-10">With Tooltip</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="absolute inset-0" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This button has a tooltip</p>
                            </TooltipContent>
                          </Tooltip>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Forms Section */}
              <section id="forms" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Form Inputs</h3>
                  <p className="text-muted-foreground">
                    Interactive form elements with validation
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Form Controls</CardTitle>
                    <CardDescription>
                      Complete set of form components with proper labeling
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Basic Inputs */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email-input">Email Address</Label>
                          <Input
                            id="email-input"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            We'll never share your email
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password-input">Password</Label>
                          <Input
                            id="password-input"
                            type="password"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio-input">Bio</Label>
                        <Textarea
                          id="bio-input"
                          placeholder="Tell us a little about yourself"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>

                    {/* Select & Combobox */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Select Dropdown</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a framework" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="react">React</SelectItem>
                              <SelectItem value="vue">Vue.js</SelectItem>
                              <SelectItem value="angular">Angular</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Searchable Combobox</Label>
                          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCombobox}
                                className="w-full justify-between"
                              >
                                {selectedFramework
                                  ? frameworks.find(fw => fw.value === selectedFramework)?.label
                                  : "Select framework..."}
                                <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50 rotate-90" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search frameworks..." />
                                <CommandList>
                                  <CommandEmpty>No framework found</CommandEmpty>
                                  <CommandGroup>
                                    {frameworks.map((framework) => (
                                      <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                          setSelectedFramework(
                                            currentValue === selectedFramework ? "" : currentValue
                                          );
                                          setOpenCombobox(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedFramework === framework.value ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {framework.label}
                                        <span className="ml-auto text-xs text-muted-foreground">
                                          {framework.description}
                                        </span>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    {/* Checkboxes & Switches */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Toggles & Switches</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms-checkbox" />
                            <Label htmlFor="terms-checkbox">
                              Accept terms and conditions
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="newsletter-checkbox" />
                            <Label htmlFor="newsletter-checkbox">
                              Subscribe to newsletter
                            </Label>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="notifications-switch">Notifications</Label>
                            <Switch id="notifications-switch" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="darkmode-switch">Dark Mode</Label>
                            <Switch id="darkmode-switch" checked={theme === "dark"} onCheckedChange={toggleTheme} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Picker */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Date & Time Picker</h4>
                      <div className="space-y-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !datePickerDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {datePickerDate ? (
                                format(datePickerDate, "PPP HH:mm", { locale: zhCN })
                              ) : (
                                <span>Select date and time</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <div className="p-3 space-y-3">
                              <Calendar
                                mode="single"
                                selected={datePickerDate}
                                onSelect={setDatePickerDate}
                                className="rounded-md"
                              />
                              <div className="border-t pt-3 space-y-2">
                                <Label className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  Time
                                </Label>
                                <Input
                                  type="time"
                                  value={
                                    datePickerDate
                                      ? format(datePickerDate, "HH:mm")
                                      : "00:00"
                                  }
                                  onChange={(e) => {
                                    const [hours, minutes] = e.target.value.split(":");
                                    const newDate = datePickerDate ? new Date(datePickerDate) : new Date();
                                    newDate.setHours(parseInt(hours));
                                    newDate.setMinutes(parseInt(minutes));
                                    setDatePickerDate(newDate);
                                  }}
                                />
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        {datePickerDate && (
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <span className="text-sm">
                              Selected: {format(datePickerDate, "yyyy/MM/dd HH:mm", { locale: zhCN })}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDatePickerDate(undefined)}
                            >
                              Clear
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Slider & Progress */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Sliders & Progress</h4>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Volume</Label>
                            <span className="text-sm text-muted-foreground">{progress}%</span>
                          </div>
                          <Slider
                            value={[progress]}
                            onValueChange={([value]) => setProgress(value)}
                            max={100}
                            step={1}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setProgress(Math.max(0, progress - 10))}
                            >
                              -10
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setProgress(Math.min(100, progress + 10))}
                            >
                              +10
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Progress Bar</Label>
                          <Progress value={progress} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <Button className="w-full">Submit Form</Button>
                  </CardFooter>
                </Card>
              </section>

              {/* Data Display Section */}
              <section id="data" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Data Display</h3>
                  <p className="text-muted-foreground">
                    Components for presenting structured data
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Table</CardTitle>
                      <CardDescription>
                        Responsive table with sorting capabilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Invoice</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[
                              { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
                              { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
                              { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
                              { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
                            ].map((invoice) => (
                              <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      invoice.status === "Paid"
                                        ? "default"
                                        : invoice.status === "Pending"
                                        ? "secondary"
                                        : "destructive"
                                    }
                                  >
                                    {invoice.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{invoice.method}</TableCell>
                                <TableCell className="text-right">{invoice.amount}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Badges & Avatars */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Badges & Avatars</CardTitle>
                      <CardDescription>
                        Status indicators and user representations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Badge Variants</Label>
                        <div className="flex flex-wrap gap-2">
                          {["default", "secondary", "destructive", "outline", "success"].map((variant) => (
                            <Badge key={variant} variant={variant as any}>
                              {variant.charAt(0).toUpperCase() + variant.slice(1)}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Avatar Gallery</Label>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                            <AvatarFallback>VC</AvatarFallback>
                          </Avatar>
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                              <Avatar key={i} className="border-2 border-background">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  U{i}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Skeleton Loaders</Label>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[250px]" />
                              <Skeleton className="h-4 w-[200px]" />
                            </div>
                          </div>
                          <Skeleton className="h-[125px] w-full rounded-xl" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Overlays Section */}
              <section id="overlays" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Overlays</h3>
                  <p className="text-muted-foreground">
                    Modal dialogs, popovers, and contextual overlays
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Overlay Components</CardTitle>
                    <CardDescription>
                      Interactive overlays for user engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Dialog */}
                      <div className="space-y-2">
                        <Label>Dialog Modal</Label>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Open Dialog
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmation Dialog</DialogTitle>
                              <DialogDescription>
                                This is a modal dialog with proper focus management
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="dialog-input">Enter your message</Label>
                                <Input
                                  id="dialog-input"
                                  placeholder="Type something..."
                                  value={dialogInput}
                                  onChange={(e) => setDialogInput(e.target.value)}
                                  onKeyDown={handleDialogKeyDown}
                                  autoFocus
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleDialogSubmit}>
                                Confirm
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {/* Sheet */}
                      <div className="space-y-2">
                        <Label>Side Sheet</Label>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Open Sheet
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Side Panel</SheetTitle>
                              <SheetDescription>
                                Accessible side panel for secondary content
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-6">
                              <p className="text-sm text-muted-foreground">
                                Sheet content goes here. Perfect for mobile navigation or settings.
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>

                      {/* Drawer */}
                      <div className="space-y-2">
                        <Label>Bottom Drawer</Label>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Open Drawer
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Bottom Drawer</DrawerTitle>
                              <DrawerDescription>
                                Mobile-friendly bottom sheet
                              </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                              <Button>Action</Button>
                              <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      </div>

                      {/* Popover */}
                      <div className="space-y-2">
                        <Label>Popover</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Show Popover
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Information</h4>
                              <p className="text-sm text-muted-foreground">
                                Popovers are perfect for tooltips and additional information.
                              </p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Tooltip */}
                      <div className="space-y-2">
                        <Label>Tooltip</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Hover for Tooltip
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is a helpful tooltip</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Hover Card */}
                      <div className="space-y-2">
                        <Label>Hover Card</Label>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="outline" className="w-full">
                              Hover Card
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>VC</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold">@shadcn</h4>
                                <p className="text-sm">
                                  Creator of shadcn/ui. Building open-source tools.
                                </p>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Navigation Section */}
              <section id="navigation" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Navigation</h3>
                  <p className="text-muted-foreground">
                    Menus, tabs, and navigation components
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tabs */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tab Navigation</CardTitle>
                      <CardDescription>
                        Organize content with accessible tabs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="account">Account</TabsTrigger>
                          <TabsTrigger value="password">Password</TabsTrigger>
                          <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                          <Card>
                            <CardHeader>
                              <CardTitle>Account Settings</CardTitle>
                              <CardDescription>
                                Update your account information
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label>Display Name</Label>
                                <Input placeholder="Enter your name" />
                              </div>
                              <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="email@example.com" />
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="password">
                          <Card>
                            <CardHeader>
                              <CardTitle>Change Password</CardTitle>
                              <CardDescription>
                                Update your password here
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label>Current Password</Label>
                                <Input type="password" />
                              </div>
                              <div className="space-y-2">
                                <Label>New Password</Label>
                                <Input type="password" />
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="settings">
                          <Card>
                            <CardHeader>
                              <CardTitle>Preferences</CardTitle>
                              <CardDescription>
                                Customize your experience
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label>Dark Mode</Label>
                                  <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
                                </div>
                                <div className="flex items-center justify-between">
                                  <Label>Notifications</Label>
                                  <Switch />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* Menus */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Context Menus</CardTitle>
                      <CardDescription>
                        Dropdown and context menu patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <Label>Dropdown Menu</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">Dropdown Menu</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Context Menu</Label>
                        <ContextMenu>
                          <ContextMenuTrigger asChild>
                            <div className="flex h-[100px] items-center justify-center rounded-md border border-dashed text-sm">
                              Right click here
                            </div>
                          </ContextMenuTrigger>
                          <ContextMenuContent>
                            <ContextMenuItem>Back</ContextMenuItem>
                            <ContextMenuItem disabled>Forward</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Reload</ContextMenuItem>
                            <ContextMenuItem>Save As...</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>View Page Source</ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <Label>Breadcrumb Navigation</Label>
                        <Breadcrumb>
                          <BreadcrumbList>
                            <BreadcrumbItem>
                              <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Feedback Section */}
              <section id="feedback" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Feedback</h3>
                  <p className="text-muted-foreground">
                    Alerts, toasts, and loading states
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Alerts */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Alert Messages</CardTitle>
                      <CardDescription>
                        Informative messages for user feedback
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>
                          This is an informational alert for important updates.
                        </AlertDescription>
                      </Alert>

                      <Alert variant="destructive">
                        <X className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          There was an error processing your request. Please try again.
                        </AlertDescription>
                      </Alert>

                      <Alert variant="default" className="border-primary">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                          Your changes have been saved successfully.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  {/* Toasts */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Toast Notifications</CardTitle>
                      <CardDescription>
                        Non-intrusive notifications for user actions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              sonnerToast("Default Notification", {
                                description: "This is a default toast message",
                              });
                            }}
                          >
                            Default
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              sonnerToast.success("Success!", {
                                description: "Operation completed successfully",
                                action: {
                                  label: "Undo",
                                  onClick: () => console.log("Undone"),
                                },
                              });
                            }}
                          >
                            Success
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              sonnerToast.error("Error", {
                                description: "Something went wrong",
                              });
                            }}
                          >
                            Error
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              sonnerToast.warning("Warning", {
                                description: "Please review your changes",
                              });
                            }}
                          >
                            Warning
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              sonnerToast.loading("Loading...", {
                                description: "Please wait while we process your request",
                              });
                            }}
                          >
                            Loading
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const promise = new Promise((resolve) =>
                                setTimeout(resolve, 2000)
                              );
                              sonnerToast.promise(promise, {
                                loading: "Processing...",
                                success: "Successfully processed!",
                                error: "Failed to process",
                              });
                            }}
                          >
                            Promise
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Label>Progress Indicator</Label>
                        <Progress value={66} className="h-2" />
                        <p className="text-xs text-muted-foreground text-center">
                          66% complete
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Layout Section */}
              <section id="layout" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Layout Components</h3>
                  <p className="text-muted-foreground">
                    Responsive containers, grids, and layout utilities
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Layout & Spacing</CardTitle>
                    <CardDescription>
                      Flexible layout components for responsive designs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Resizable Panels */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Resizable Panels</h4>
                      <ResizablePanelGroup
                        direction="horizontal"
                        className="min-h-[200px] rounded-lg border"
                      >
                        <ResizablePanel defaultSize={50}>
                          <div className="flex h-full items-center justify-center p-6">
                            <div className="text-center">
                              <p className="font-semibold">Left Panel</p>
                              <p className="text-sm text-muted-foreground">
                                Drag the handle to resize
                              </p>
                            </div>
                          </div>
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={50}>
                          <div className="flex h-full items-center justify-center p-6">
                            <div className="text-center">
                              <p className="font-semibold">Right Panel</p>
                              <p className="text-sm text-muted-foreground">
                                Resizable content area
                              </p>
                            </div>
                          </div>
                        </ResizablePanel>
                      </ResizablePanelGroup>
                    </div>

                    {/* Aspect Ratio */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Aspect Ratio</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { ratio: 16 / 9, name: "Video (16:9)" },
                          { ratio: 4 / 3, name: "Photo (4:3)" },
                          { ratio: 1 / 1, name: "Square (1:1)" },
                          { ratio: 21 / 9, name: "Cinematic (21:9)" },
                        ].map((item) => (
                          <div key={item.name} className="space-y-2">
                            <Label>{item.name}</Label>
                            <AspectRatio ratio={item.ratio} className="bg-muted rounded-md overflow-hidden">
                              <div className="flex h-full items-center justify-center">
                                <div className="text-center">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Ratio: {item.ratio}
                                  </p>
                                </div>
                              </div>
                            </AspectRatio>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scroll Area */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Scroll Area</h4>
                      <ScrollArea className="h-[200px] w-full rounded-md border">
                        <div className="p-6">
                          <h5 className="font-semibold mb-4">Scrollable Content</h5>
                          <div className="space-y-4">
                            {Array.from({ length: 15 }).map((_, i) => (
                              <div
                                key={i}
                                className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Item {i + 1}</span>
                                  <Badge variant="outline">
                                    #{i + 1}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  This is a scrollable item with content that extends beyond the viewport.
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Carousel */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Carousel</h4>
                      <Carousel className="w-full">
                        <CarouselContent>
                          {[
                            { title: "First Slide", description: "Introduction to components" },
                            { title: "Second Slide", description: "Interactive examples" },
                            { title: "Third Slide", description: "Best practices" },
                            { title: "Fourth Slide", description: "Accessibility guide" },
                            { title: "Fifth Slide", description: "Customization options" },
                          ].map((slide, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                              <Card>
                                <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
                                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <span className="text-lg font-bold text-primary">
                                      {index + 1}
                                    </span>
                                  </div>
                                  <h4 className="font-semibold mb-2">{slide.title}</h4>
                                  <p className="text-sm text-center text-muted-foreground">
                                    {slide.description}
                                  </p>
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* AI Chat Section */}
              <section id="chat" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">AI Chat Interface</h3>
                  <p className="text-muted-foreground">
                    Interactive chat component with markdown support
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Assistant</CardTitle>
                    <CardDescription>
                      Ask questions about UI components and best practices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                            <Search className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">AI Assistant Demo</p>
                            <p className="text-sm text-muted-foreground">
                              This is a fully functional chat interface that can be integrated with any AI service.
                              Features include markdown rendering, code syntax highlighting, and streaming responses.
                            </p>
                          </div>
                        </div>
                      </div>

                      <AIChatBox
                        messages={chatMessages}
                        onSendMessage={handleChatSend}
                        isLoading={isChatLoading}
                        placeholder="Ask about UI components or best practices..."
                        height="500px"
                        emptyStateMessage="I'm here to help you with UI components and development questions!"
                        suggestedPrompts={[
                          "How do I use the Button component?",
                          "Show me a form example",
                          "What are best practices for accessibility?",
                          "How to customize themes?",
                        ]}
                        showSuggestedPrompts={true}
                        autoScroll={true}
                        allowMarkdown={true}
                        className="border-0 shadow-sm"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-6">
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Note:</strong> This is a demo with simulated responses. In production,
                        connect to your preferred AI service (OpenAI, Anthropic, etc.) via tRPC or REST API.
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </section>
            </main>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t py-8 mt-12 bg-muted/20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-6 w-6" />
                  <span className="font-bold">UI Components</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A comprehensive showcase of shadcn/ui components built with React, TypeScript, and Tailwind CSS.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://ui.shadcn.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Official Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/shadcn-ui/ui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                    >
                      <Github className="h-3 w-3" />
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindcss.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Tailwind CSS
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4">Components</h4>
                <div className="flex flex-wrap gap-2">
                  {["Buttons", "Forms", "Data", "Overlays", "Navigation", "Feedback"].map((cat) => (
                    <Badge key={cat} variant="outline" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
              <p>
                Built with ❤️ using shadcn/ui • {new Date().getFullYear()}
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {theme === "light" ? "Dark" : "Light"} Mode
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}