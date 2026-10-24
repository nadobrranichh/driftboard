import {
  SquareDashedMousePointer,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { boardColorRamps } from "./boardIconsList";
type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: keyof typeof boardColorRamps;
};
const features: Feature[] = [
  {
    title: "Real-time sync",
    description:
      "See changes the moment your teammates make them. No refreshing, no conflicts.",
    icon: Zap,
    color: "blue",
  },
  {
    title: "Drag, drop, done",
    description:
      "Move cards between columns in one motion. Simple enough for anyone on the team.",
    icon: SquareDashedMousePointer,
    color: "green",
  },
  {
    title: "Built for teams",
    description:
      "Invite anyone with a link. Everyone stays on the same page, literally.",
    icon: Users,
    color: "orange",
  },
];

export default features;
