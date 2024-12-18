import { useState } from "react";
import { SidebarNav } from "./components/NavigationItem";
import { WelcomeBanner } from "./components/WelcomeBanner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Boxes, Building, Database, Edit } from "lucide-react";

export const navigationItems = [
  {
    text: "Welcome to your GrantGenie application",
    isActive: true,
    iconSrc: Boxes,
  },
  {
    text: "The United Nations Democracy Fund Program",
    isActive: false,
    iconSrc: Building,
  },
  {
    text: "Application Planning",
    isActive: false,
    iconSrc: Database,
  },
  {
    text: "Research for My Application",
    isActive: false,
    iconSrc: Edit,
  },
];

export const ProjectDetail = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <WelcomeBanner
        title="Let's Get Started"
        description="Learn more about the grant and how GrantGenie platform works"
      />

      <div className="mt-14 w-full max-w-[1098px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full mb-5">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
            {navigationItems.map((item, index) => (
              <SidebarNav
                key={index}
                index={index}
                text={item.text}
                iconSrc={item.iconSrc}
                isActive={index === activeTab}
                lastItem={navigationItems.length - 1}
              />
            ))}
          </div>

          <ScrollArea>
            <div className="flex flex-col ml-5 w-[74%] h-[36rem]  max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-black max-md:mt-6 max-md:max-w-full">
                <div className="text-3xl font-semibold tracking-tight leading-9 w-[463px]">
                  Welcome to your GrantGenie application
                </div>
                <div className="mt-7 text-base leading-7 max-md:max-w-full">
                  Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
                  ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                  bibendum lorem. Morbi convallis convallis diam sit amet
                  lacinia. Aliquam in elementum tellus.
                  <br /> Curabitur tempor quis eros tempus lacinia. Nam bibendum
                  pellentesque quam a convallis. Sed ut vulputate nisi. Integer
                  in felis sed leo vestibulum venenatis. Suspendisse quis arcu
                  sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a
                  eleifend magna. Nam metus lacus, porttitor eu mauris a,
                  blandit ultrices nibh. Mauris sit amet magna non ligula
                  vestibulum eleifend. Nulla varius volutpat turpis sed lacinia.
                  Nam eget mi in purus lobortis eleifend. Sed nec ante dictum
                  sem condimentum ullamcorper quis venenatis nisi. Proin vitae
                  facilisis nisi, ac posuere leo.
                  <br /> Nam pulvinar blandit velit, id condimentum diam
                  faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec,
                  fermentum congue felis. Quisque mauris dolor, fringilla sed
                  tincidunt ac, finibus non odio. Sed vitae mauris nec ante
                  pretium finibus. Donec nisl neque, pharetra ac elit eu,
                  faucibus aliquam ligula. Nullam dictum, tellus tincidunt
                  tempor laoreet, nibh elit sollicitudin felis, eget feugiat
                  sapien diam nec nisl. Aenean gravida turpis nisi, consequat
                  dictum risus dapibus a. Duis felis ante, varius in neque eu,
                  tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet
                  cursus. Etiam pulvinar purus vitae justo pharetra consequat.
                  Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus
                  id tempus aliquet.
                  <br /> Vestibulum dictum ultrices elit a luctus. Sed in ante
                  ut leo congue posuere at sit amet ligula. Pellentesque eget
                  augue nec nisl sodales blandit sed et sem. Aenean quis finibus
                  arcu, in hendrerit purus. Praesent ac aliquet lorem. Morbi
                  feugiat aliquam ligula, et vestibulum ligula hendrerit vitae.
                  Sed ex lorem, pulvinar sed auctor sit amet, molestie a nibh.
                  Ut euismod nisl arcu, sed placerat nulla volutpat aliquet. Ut
                  id convallis nisl. Ut mauris leo, lacinia sed elit id,
                  sagittis rhoncus odio. Pellentesque sapien libero, lobortis a
                  placerat et, malesuada sit amet dui. Nam sem sapien, congue eu
                  rutrum nec, pellentesque eget ligula.
                  <br /> Nunc tempor interdum ex, sed cursus nunc egestas
                  aliquet. Pellentesque interdum vulputate elementum. Donec erat
                  diam, pharetra nec enim ut, bibendum pretium tellus.
                  Vestibulum et turpis nibh. Cras vel ornare velit, ac pretium
                  arcu. Cras justo augue, finibus id sollicitudin et, rutrum
                  eget metus. Suspendisse ut mauris eu massa pulvinar
                  sollicitudin vel sed enim. Pellentesque viverra arcu et
                  dignissim vehicula. Donec a velit ac dolor dapibus
                  pellentesque sit amet at erat. Phasellus porttitor, justo eu
                  ultrices vulputate, nisi mi placerat lectus, sed rutrum tellus
                  est id urna. Aliquam pellentesque odio metus, sit amet
                  imperdiet nisl sodales eu. Quisque viverra nunc nec vestibulum
                  dapibus. Integer nec diam a libero tincidunt varius sed vel
                  odio. Donec rutrum dapibus massa, vel tempor nulla porta id.
                  Suspendisse vulputate fermentum sem sollicitudin facilisis.
                  Aliquam vehicula sapien nec ante auctor, quis mollis leo
                  tincidunt.
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        <div className="flex items-center justify-end mt-5">
          <Button onClick={() => setActiveTab((prev) => prev + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
};
