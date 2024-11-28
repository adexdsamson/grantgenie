import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Avatar as ShadcnAvatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { deleteRequest } from "@/lib/axiosInstance";
import { ProjectList } from "@/pages/Projects";
import { useToastHandlers } from "@/hooks/useToaster";
import { ApiResponseError } from "@/types";
import { ConfirmAlert } from "@/components/layouts/ConfirmAlert";

export interface UserCardProps {
  id: number;
  name: string;
  email: string;
  description: string;
  avatarText: string;
  imageUrl: string;
  cv_link: string
}

export function EmployeeCard({
  name,
  email,
  description,
  avatarText,
  id,
  cv_link
}: UserCardProps) {

  return (
    <Card className="max-w-[272px]">
      <CardContent className="flex flex-col justify-center px-2.5 py-3">
        <div className="flex flex-col w-full max-w-[252px]">
          <section className="flex gap-2 items-center">
            <Avatar text={getInitials(avatarText)} />
            <UserInfo name={name} email={email} description={description} />
          </section>
          <div className="flex gap-10 justify-between items-center w-full mt-4">
            <ConfirmAlert
              {...{
                text: `You are about to delete ${name}'s record, Are you certain about it?`,
                title: "Remove Employee",
                url: `/grants/employees/${id}/`,
                trigger: (
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 p-2"
                    aria-label="View external link"
                  >
                    <Trash className="text-red-600" />
                  </Button>
                ),
              }}
            ></ConfirmAlert>
            <Button
              variant="secondary"
              className="text-xs font-medium"
              onClick={() => window.open(cv_link, "blank")}
            >
              Open CV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface UserInfoProps {
  name: string;
  email: string;
  description: string;
}

function UserInfo({ name, email, description }: UserInfoProps) {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-col w-[204px] p-0">
        <section className="flex flex-col max-w-full rounded-none w-[141px]">
          <h2 className="self-start leading-none text-base text-slate-700">
            {name}
          </h2>
          <p className="text-sm leading-none text-slate-500">{email}</p>
        </section>
        <p className="mt-3 text-xs font-medium leading-4 text-slate-600">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

interface AvatarProps {
  text: string;
}

function Avatar({ text }: AvatarProps) {
  return (
    <ShadcnAvatar className="w-10 h-10">
      <AvatarFallback className="bg-slate-200 text-slate-900">
        {text}
      </AvatarFallback>
    </ShadcnAvatar>
  );
}
