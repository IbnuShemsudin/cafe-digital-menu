import {
  CakeSlice,
  Coffee,
  Egg,
  GlassWater,
  IceCream,
  Sparkles,
  Utensils,
} from "lucide-react";

const icons = {
  Sparkles,
  Coffee,
  GlassWater,
  Egg,
  CakeSlice,
  Utensils,
  IceCream,
};

const CategoryIcon = ({ name, size = 18 }) => {
  const Icon = icons[name] || Sparkles;

  return <Icon size={size} strokeWidth={1.8} />;
};

export default CategoryIcon;