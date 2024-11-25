import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface CandidateProps {
  name: string;
  email: string;
  description: string;
  avatarInitials: string;
  imageUrl: string;
}

export function CandidateCard({
  name,
  email,
  description,
  avatarInitials,
  imageUrl,
}: CandidateProps) {
  return (
    <Card className="">
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
          </div>
        </div>
        <Button variant={"outline"}>
          <Trash />
        </Button>
        <Button>Open CV</Button>
      </CardFooter>
    </Card>
  );
}
