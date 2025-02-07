"use client";

import * as React from "react";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";

const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Elektronika",
    href: "/category/electronics",
    description: "Smartfonlar, noutbuklar va boshqa gadjetlar",
  },
  {
    title: "Kiyim-kechak",
    href: "/category/clothing",
    description: "Zamonaviy va an'anaviy kiyimlar",
  },
  {
    title: "Uy-ro'zg'or",
    href: "/category/home",
    description: "Uy jihozlari va dekoratsiya mahsulotlari",
  },
  {
    title: "Kitoblar",
    href: "/category/books",
    description: "Badiiy adabiyot, darsliklar va boshqa nashrlar",
  },
];

export function ECommerceNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { userId } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link to={"/"} className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">E-do'kon</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Kategoriyalar</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {categories.map((category) => (
                      <li key={category.title} className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to={category.href}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {category.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {category.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={"/products"}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Mahsulotlar
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to={"/about"}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Biz haqimizda
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Menyu</SheetTitle>
              <SheetDescription>Kategoriyalar va sahifalar</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  to={category.href}
                  className="block px-2 py-1 text-lg"
                >
                  {category.title}
                </Link>
              ))}
              <Link to={"/products"} className="block px-2 py-1 text-lg">
                Mahsulotlar
              </Link>
              <Link to={"/about"} className="block px-2 py-1 text-lg">
                Biz haqimizda
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end mx-5">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Qidirish..."
                className="pl-8 md:w-[300px] lg:w-[300px]"
              />
            </div>
          </div>
          <nav className="flex items-center">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 h-4 w-4 rounded-full p-0 "
              >
                <div className="flex h-full w-full items-center justify-center">
                  3
                </div>
              </Badge>
              <span className="sr-only">Savatcha</span>
            </Button>
          </nav>
          <div>
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link to={"/login"}>
                <Button variant="secondary" className="hidden md:flex">
                  <User className="mr-2 h-4 w-4" />
                  Kirish
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
