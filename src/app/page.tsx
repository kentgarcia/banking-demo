import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Menu,
  Target,
  BarChart,
  Accessibility,
  Check,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="font-bold">LandingLens</span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Button className="hidden md:inline-flex" asChild>
            <Link href="#">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-card border-t">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold">LandingLens</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Recreate any landing page with precision and speed.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Product</h4>
          <ul className="mt-4 space-y-2">
            <li><Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</Link></li>
            <li><Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-4 space-y-2">
            <li><Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About Us</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Careers</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-4 space-y-2">
            <li><Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy Policy</Link></li>
            <li><Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} LandingLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto grid items-center gap-6 px-4 pb-8 pt-6 md:py-10 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Recreate Stunning Landing Pages in Minutes
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              LandingLens helps you clone and customize any landing page with unmatched precision.
              Boost your marketing efforts with pixel-perfect designs, optimized for performance and accessibility.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link href="#">
                  Start for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#">View Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Landing page builder interface"
              className="rounded-lg shadow-2xl"
              data-ai-hint="digital marketing website"
            />
          </div>
        </section>

        <section id="features" className="w-full bg-card py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features designed to make landing page recreation seamless and effective.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
              <div className="grid gap-2 text-center">
                <Target className="mx-auto h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Pixel-Perfect Recreation</h3>
                <p className="text-muted-foreground">
                  Clone any design with high fidelity. Our advanced engine captures every detail.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <BarChart className="mx-auto h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Performance Optimized</h3>
                <p className="text-muted-foreground">
                  Pages load lightning-fast, ensuring a great user experience and better SEO.
                </p>
              </div>
              <div className="grid gap-2 text-center">
                <Accessibility className="mx-auto h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Accessibility Compliant</h3>
                <p className="text-muted-foreground">
                  We automatically ensure your pages meet WCAG standards for accessibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Choose the plan that's right for you. No hidden fees.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>For individuals and small projects.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 flex-grow">
                  <div className="text-4xl font-bold">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 5 pages per month</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Standard support</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Basic analytics</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Choose Plan</Button>
                </CardFooter>
              </Card>
              <Card className="border-primary ring-2 ring-primary flex flex-col">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses and agencies.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 flex-grow">
                  <div className="text-4xl font-bold">$99<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Unlimited pages</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Priority support</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Advanced analytics</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Team collaboration</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Plan</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full bg-card py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Developers and Marketers</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">"LandingLens saved us countless hours. The accuracy of the recreated pages is just incredible. A must-have tool for any fast-moving team."</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Jane Doe</p>
                      <p className="text-sm text-muted-foreground">Marketing Lead, Innovate Co.</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">"As a developer, I appreciate the clean code and performance optimizations. It's not just a clone, it's an upgrade."</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">John Smith</p>
                      <p className="text-sm text-muted-foreground">Frontend Developer, Tech Solutions</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">"The accessibility features are a game-changer. We can ensure our campaigns are inclusive without extra work. Highly recommended."</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Alex Lee</p>
                      <p className="text-sm text-muted-foreground">CEO, StartupX</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Workflow?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Join thousands of happy customers and start creating beautiful, high-performance landing pages today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="#">Get Started Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
