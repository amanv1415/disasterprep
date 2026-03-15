import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Search, 
  Navigation, 
  Phone, 
  Clock,
  Users,
  Bed,
  Utensils,
  Shield,
  Building,
  Home
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const shelters = [
  {
    id: 1,
    name: "Mumbai Central Community Hall",
    type: "Community Center",
    address: "Grant Road, Mumbai Central, Mumbai",
    distance: "0.8 km",
    capacity: 500,
    facilities: ["Food", "Medical", "Shelter", "Communication"],
    contact: "+91-22-2123-4567",
    status: "Open",
    occupancy: 65
  },
  {
    id: 2,
    name: "Dharavi Emergency Shelter",
    type: "Government Facility",
    address: "Dharavi Main Road, Mumbai",
    distance: "1.2 km",
    capacity: 800,
    facilities: ["Food", "Medical", "Shelter", "Sanitation"],
    contact: "+91-22-2456-7890",
    status: "Open",
    occupancy: 45
  },
  {
    id: 3,
    name: "Bandra Sports Complex",
    type: "Sports Complex",
    address: "Linking Road, Bandra West, Mumbai",
    distance: "2.1 km",
    capacity: 1200,
    facilities: ["Food", "Shelter", "Recreation", "Security"],
    contact: "+91-22-2789-0123",
    status: "Open",
    occupancy: 30
  },
  {
    id: 4,
    name: "Colaba Relief Center",
    type: "Relief Center",
    address: "Colaba Causeway, Colaba, Mumbai",
    distance: "3.5 km",
    capacity: 300,
    facilities: ["Medical", "Shelter", "Communication"],
    contact: "+91-22-2234-5678",
    status: "Full",
    occupancy: 100
  }
];

const facilityIcons = {
  "Food": Utensils,
  "Medical": Shield,
  "Shelter": Home,
  "Communication": Phone,
  "Sanitation": Building,
  "Recreation": Users,
  "Security": Shield
};

const Maps = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShelter, setSelectedShelter] = useState<typeof shelters[0] | null>(null);

  const filteredShelters = shelters.filter(shelter =>
    shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-success text-success-foreground';
      case 'full': return 'bg-warning text-warning-foreground';
      case 'closed': return 'bg-emergency text-emergency-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 50) return 'text-success';
    if (occupancy < 80) return 'text-warning';
    return 'text-emergency';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2 flex items-center gap-3">
            <MapPin className="h-8 w-8 text-primary" />
            {t("maps.title")}
          </h1>
          <p className="text-muted-foreground">{t("maps.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map Placeholder & Search */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("maps.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Map Placeholder */}
            <Card className="shadow-soft mb-6">
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t("maps.interactiveMap")}</h3>
                    <p className="text-muted-foreground mb-4">{t("maps.mapSetup")}</p>
                    <Button variant="outline" onClick={() => alert("Map feature would integrate with mapping service")}>
                      <Navigation className="h-4 w-4 mr-2" />
                      {t("maps.viewFullMap")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Shelter Details */}
            {selectedShelter && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    {t("maps.shelterDetails")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{selectedShelter.name}</h3>
                  <p className="text-muted-foreground mb-4">{selectedShelter.address}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground">{t("maps.capacity")}</div>
                      <div className="text-lg font-semibold">{selectedShelter.capacity} {t("maps.people")}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{t("maps.currentOccupancy")}</div>
                      <div className={`text-lg font-semibold ${getOccupancyColor(selectedShelter.occupancy)}`}>
                        {selectedShelter.occupancy}%
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">{t("maps.availableFacilities")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedShelter.facilities.map((facility, index) => {
                        const IconComponent = facilityIcons[facility as keyof typeof facilityIcons] || Shield;
                        return (
                          <Badge key={index} variant="outline" className="gap-1">
                            <IconComponent className="h-3 w-3" />
                            {facility}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="gradient-primary flex-1">
                      <Navigation className="h-4 w-4 mr-2" />
                      {t("maps.getDirections")}
                    </Button>
                    <Button variant="outline" onClick={() => window.open(`tel:${selectedShelter.contact}`)}>
                      <Phone className="h-4 w-4 mr-2" />
                      {t("maps.call")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Shelter List */}
          <div>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  {t("maps.nearbyShelters")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {filteredShelters.map((shelter) => (
                  <div
                    key={shelter.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                      selectedShelter?.id === shelter.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedShelter(shelter)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{shelter.name}</h4>
                      <Badge className={getStatusColor(shelter.status)}>
                        {shelter.status}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{shelter.type}</p>
                    <p className="text-xs text-muted-foreground mb-3">{shelter.address}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        {shelter.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {shelter.capacity} capacity
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{t("maps.occupancy")}</span>
                        <span className={getOccupancyColor(shelter.occupancy)}>
                          {shelter.occupancy}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${
                            shelter.occupancy < 50 ? 'bg-success' :
                            shelter.occupancy < 80 ? 'bg-warning' : 'bg-emergency'
                          }`}
                          style={{ width: `${shelter.occupancy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-soft mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {t("maps.quickActions")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Navigation className="h-4 w-4 mr-2" />
                  {t("maps.findNearest")}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  {t("maps.emergencyContacts")}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  {t("maps.reportStatus")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;