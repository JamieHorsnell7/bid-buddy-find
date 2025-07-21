import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Building, DollarSign, Globe, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data - in real app this would come from API
const mockTenderDetail = {
  id: "1",
  title: "Flooring - Measured Term Contract",
  buyer: "City Hospitals Independent Commercial Enterprises Limited",
  country: "United Kingdom",
  language: "English",
  flag: "🇬🇧",
  description: "Adhoc flooring work as specified by choice",
  
  cpvCodes: [
    { code: "45430000", description: "Floor and wall covering work" },
    { code: "44110000", description: "Construction materials" },
    { code: "45260000", description: "Roof works and other special trade construction works" },
    { code: "45210000", description: "Building construction work" },
    { code: "45450000", description: "Other building completion work" }
  ],
  
  buyerProvidedCpv: "No CPV codes were found",
  
  publishedDate: "25th of March 2030 at 12:00 AM",
  deadlineDate: "28th of April 2025 at 1:00 AM",
  
  currency: "Not published",
  value: "Not published",
  gbpValue: "Not published",
  usdValue: "Not published",
  euroValue: "Not published",
  
  buyerName: "City Hospitals Independent Commercial Enterprises Limited",
  contact: "No Contact"
};

const TenderDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Link to="/tenders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to search
          </Button>
        </Link>
        <Button className="bg-primary hover:bg-primary/90">
          Go to source
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Search</span>
        <span>&gt;</span>
        <span>Tenders</span>
        <span>&gt;</span>
        <span>Flooring - Measured Term Contract</span>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Title and Flag */}
        <div className="flex items-start gap-3">
          <div className="text-2xl">{mockTenderDetail.flag}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {mockTenderDetail.title}
            </h1>
            <p className="text-muted-foreground">
              <Building className="w-4 h-4 inline mr-1" />
              Buyer: {mockTenderDetail.buyer}
            </p>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{mockTenderDetail.description}</p>
          </CardContent>
        </Card>

        {/* CPV Codes */}
        <Card>
          <CardHeader>
            <CardTitle>Open Opportunities' Categories (CPV codes):</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockTenderDetail.cpvCodes.map((cpv, index) => (
              <div key={index} className="flex gap-2">
                <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                  {cpv.code}
                </span>
                <span className="text-sm">{cpv.description}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Buyer Provided Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Buyer Provided Categories (CPV Codes):</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{mockTenderDetail.buyerProvidedCpv}</p>
          </CardContent>
        </Card>

        {/* Date Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Published date:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{mockTenderDetail.publishedDate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Deadline date:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{mockTenderDetail.deadlineDate}</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Currency:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockTenderDetail.currency}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Value:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockTenderDetail.value}</p>
            </CardContent>
          </Card>
        </div>

        {/* Currency Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>GBP Value:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockTenderDetail.gbpValue}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>USD Value:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockTenderDetail.usdValue}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EURO Value:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockTenderDetail.euroValue}</p>
            </CardContent>
          </Card>
        </div>

        {/* Buyer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Buyer name:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{mockTenderDetail.buyerName}</p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{mockTenderDetail.contact}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button className="bg-primary hover:bg-primary/90">
            Go to source
          </Button>
          <Button variant="outline">
            Save opportunity
          </Button>
          <Button variant="outline">
            Export details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;