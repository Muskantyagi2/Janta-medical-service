// Green Theme Update Script
// This script systematically updates all orange/red colors to green theme

const colorMappings = {
  // Primary orange to green
  "#ff4d2d": "#16a34a", // Main primary color
  "#e64526": "#15803d", // Hover state
  "#e64323": "#15803d", // Alternative hover

  // Orange shades to green shades
  "orange-50": "green-50",
  "orange-100": "green-100",
  "orange-500": "green-500",
  "orange-600": "green-600",

  // Focus rings
  "ring-orange-500": "ring-green-500",

  // Background colors
  "bg-orange-": "bg-green-",
  "from-orange-": "from-green-",
  "to-orange-": "to-green-",

  // Border colors
  "border-orange-": "border-green-",

  // Text colors
  "text-orange-": "text-green-",

  // Hover states
  "hover:bg-orange-": "hover:bg-green-",
  "hover:text-orange-": "hover:text-green-",
  "hover:border-orange-": "hover:border-green-",
};

console.log("Green Theme Color Mappings:");
Object.entries(colorMappings).forEach(([old, new_]) => {
  console.log(`${old} → ${new_}`);
});
