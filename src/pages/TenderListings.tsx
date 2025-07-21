import { useState } from "react";
import { Search, Filter, ChevronDown, Calendar, MapPin, Building, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockTenders = [
  {
    id: "1",
    title: "Bauinigung",
    buyer: "Stadt Göttingen",
    country: "Germany",
    language: "German",
    publishedDate: "21st of July 2025 at 12:00 AM",
    deadlineDate: "14th of August 2025 at 1:00 AM",
    description: "No Description",
    status: "Open"
  },
  {
    id: "2",
    title: "Deckenbauarbeiten",
    buyer: "Staatliches Bauamt Bamberg",
    country: "Germany",
    language: "German",
    publishedDate: "21st of July 2025 at 12:00 AM",
    deadlineDate: "9th of August 2025 at 1:00 AM",
    description: "No Description",
    status: "Open"
  },
  {
    id: "3",
    title: "Приобретение каменного угля",
    buyer: "АО «БАРСЦ»",
    country: "Kazakhstan",
    language: "Russian",
    publishedDate: "21st of July 2025 at 12:00 AM",
    deadlineDate: "26th of July 2025 at 7:37 PM",
    description: "No Description",
    status: "Open"
  }
];

const TenderListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("published-date");
  const [statusFilter, setStatusFilter] = useState("open");
  const [filtersOpen, setFiltersOpen] = useState({
    status: true,
    keyword: false,
    category: false,
    country: false,
    language: false,
    buyer: false,
    currency: false,
    publishedDate: false,
    deadlineDate: false
  });

  const toggleFilter = (filter: keyof typeof filtersOpen) => {
    setFiltersOpen(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const filteredTenders = mockTenders.filter(tender =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.buyer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-80 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Close All</Button>
              <Button variant="outline" size="sm">Open All</Button>
            </div>
          </div>

          {/* Status Filter */}
          <Collapsible open={filtersOpen.status} onOpenChange={() => toggleFilter('status')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-card border border-border rounded-lg">
              <span className="font-medium">Open / Closed</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="flex items-center gap-2 ml-4">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm">Guidance</span>
              </div>
              <div className="flex gap-2 ml-4">
                <Button 
                  variant={statusFilter === "open" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setStatusFilter("open")}
                >
                  Open
                </Button>
                <Button 
                  variant={statusFilter === "closed" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setStatusFilter("closed")}
                >
                  Closed
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Keyword Filter */}
          <Collapsible open={filtersOpen.keyword} onOpenChange={() => toggleFilter('keyword')}>
            <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-card border border-border rounded-lg">
              <span className="font-medium">Keyword</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div className="flex items-center gap-2 ml-4">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm">Guidance</span>
              </div>
              <div className="space-y-2 ml-4">
                <Input placeholder="Includes" />
                <Input placeholder="Excludes" />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Other Filters */}
          {[
            { key: 'category', label: 'Category (CPV)' },
            { key: 'country', label: 'Country' },
            { key: 'language', label: 'Language' },
            { key: 'buyer', label: 'Buyer' },
            { key: 'currency', label: 'Currency & value' },
            { key: 'publishedDate', label: 'Published date' },
            { key: 'deadlineDate', label: 'Deadline date' }
          ].map(filter => (
            <Collapsible 
              key={filter.key}
              open={filtersOpen[filter.key as keyof typeof filtersOpen]} 
              onOpenChange={() => toggleFilter(filter.key as keyof typeof filtersOpen)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-card border border-border rounded-lg">
                <span className="font-medium">{filter.label}</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
            </Collapsible>
          ))}

          <div className="space-y-2">
            <Button className="w-full bg-primary hover:bg-primary/90">Update results</Button>
            <Button variant="outline" className="w-full">Reset search</Button>
            <Button variant="outline" className="w-full">Save search</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tenders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Tenders
            </Button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Search</span>
            <span>&gt;</span>
            <span>Tenders</span>
            <span>&gt;</span>
            <span className="text-foreground">Results</span>
          </div>

          {/* Search Results Header */}
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-foreground mb-2">Search results</h2>
            <p className="text-sm text-muted-foreground">
              Search features summary: Type: Open.<br />
              Displaying top <strong>1000</strong> notices
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Sort results</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published-date">Published date (new to old)</SelectItem>
                <SelectItem value="deadline-date">Deadline date</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tender Cards */}
          <div className="space-y-4">
            {filteredTenders.map((tender) => (
              <Card key={tender.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-4 bg-muted rounded-sm flex items-center justify-center">
                      <span className="text-xs font-bold">{tender.country.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <Link to={`/tender/${tender.id}`}>
                        <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">
                          {tender.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Building className="w-4 h-4 inline mr-1" />
                        Buyer: {tender.buyer}
                      </p>
                    </div>
                    <Badge variant="secondary">{tender.status}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{tender.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Published Date</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {tender.publishedDate}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Deadline Date</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {tender.deadlineDate}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Country</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {tender.country}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-muted-foreground">{tender.language}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderListings;
