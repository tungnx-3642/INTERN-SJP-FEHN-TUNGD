import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { SVGProps } from "react";

type StaticCardProps = {
  data: {
    title: string;
    text: string;
    value: string | number;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  };
};

function StaticCard({ data }: StaticCardProps) {
  const Icon = data.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Icon className="w-5 h-5" /> {data.title}
          </span>
          <span className="text-lg font-medium">{data.value}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">{data.text}</div>
      </CardContent>
    </Card>
  );
}

export default StaticCard;
