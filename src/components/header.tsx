import { 
    Package2, 
    ShoppingCart, 
    User, 
    LogOut, 
    Settings, 
    History 
  } from "lucide-react";
  import { Link } from "react-router";
  import { Button } from "./ui/button";
  import { Badge } from "./ui/badge";
  import { PendingApprovalsBox } from "./pending-approval"; 
  import { useState } from "react";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
  
  interface HeaderProps {
      cartItemCount: number;
  }
  
  const Header = ({ cartItemCount = 0 }: HeaderProps) => {
  const [isChecked, setIsChecked ] = useState(false);
  
      return (
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
                  <Link to="/" className="flex items-center gap-2">
                      <Package2 className="h-6 w-6" />
                      <span className="font-bold">MyApp</span>
                  </Link>
                  <div className="flex flex-row gap-2 align-middle items-center">
                      <PendingApprovalsBox 
                          isChecked={isChecked} 
                          onClick={() => setIsChecked(!isChecked)}
                      />
                      <Button
                          variant="outline"
                          size="icon"
                          className="relative"
                          onClick={() => console.log(`shopping cart click`)}
                          aria-label="Open cart">
                          <ShoppingCart className="h-5 w-5" />
                          {cartItemCount > 0 && (
                              <Badge
                                  variant="destructive"
                                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs">
                                  {cartItemCount}
                              </Badge>
                          )}
                      </Button>
                      
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button 
                                  variant="ghost" 
                                  className="relative h-8 w-8 rounded-full"
                                  aria-label="User menu"
                              >
                                  <User className="h-5 w-5" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56" align="end" forceMount>
                              <DropdownMenuLabel className="font-normal">
                                  <div className="flex flex-col space-y-1">
                                      <p className="text-sm font-medium leading-none">User Name</p>
                                      <p className="text-xs leading-none text-muted-foreground">
                                          user@example.com
                                      </p>
                                  </div>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                  <DropdownMenuItem asChild>
                                      <Link to="/purchased" className="flex items-center">
                                          <History className="mr-2 h-4 w-4" />
                                          <span>Previously Purchased</span>
                                      </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                      <Link to="/settings" className="flex items-center">
                                          <Settings className="mr-2 h-4 w-4" />
                                          <span>Settings</span>
                                      </Link>
                                  </DropdownMenuItem>
                              </DropdownMenuGroup>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                  className="flex items-center"
                                  onClick={() => console.log("Sign out clicked")}
                              >
                                  <LogOut className="mr-2 h-4 w-4" />
                                  <span>Sign out</span>
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </div>
              </div>
          </header>
      );
  };
  
  export default Header;