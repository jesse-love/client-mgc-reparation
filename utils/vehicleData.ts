export const VEHICLE_YEARS = Array.from({ length: 37 }, (_, i) => (new Date().getFullYear() + 1 - i).toString());

export const VEHICLE_MAKES = [
    "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge",
    "Fiat", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep",
    "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mini",
    "Mitsubishi", "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota",
    "Volkswagen", "Volvo", "Kenworth", "Peterbilt", "Freightliner", "International",
    "Mack", "Western Star", "Other"
];

// Common models could be added here, but purely maintaining that text is huge. 
// We will focus autocomplete on Make and Year which covers 80% of the friction.
