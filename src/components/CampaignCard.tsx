import { motion } from "framer-motion";
import { Heart, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CampaignCardProps {
  title: string;
  image: string;
  goal: number;
  raised: number;
  donors: number;
  category: string;
  urgent?: boolean;
  daysLeft?: number;
}

const CampaignCard = ({ title, image, goal, raised, donors, category, urgent, daysLeft }: CampaignCardProps) => {
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-border group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground text-xs">{category}</Badge>
          {urgent && <Badge className="bg-destructive text-destructive-foreground text-xs">Urgent</Badge>}
        </div>
        {daysLeft !== undefined && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-primary-foreground text-xs bg-foreground/40 backdrop-blur-sm px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {daysLeft} days left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-primary">₹{raised.toLocaleString()} raised</span>
            <span className="text-muted-foreground">of ₹{goal.toLocaleString()}</span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <div className="text-right text-xs text-muted-foreground mt-1">{percentage.toFixed(0)}%</div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{donors} donors</span>
          </div>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 shadow-md hover:shadow-lg transition-all">
            <Heart className="w-3.5 h-3.5" />
            Donate
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;
