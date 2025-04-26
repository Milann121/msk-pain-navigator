
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !privacyConsent) {
      toast({
        title: "Chyba",
        description: "Pre registráciu je potrebné súhlasiť so spracovaním osobných údajov",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, firstName);
        toast({
          title: "Registrácia úspešná",
          description: "Prosím skontrolujte svoj email pre overenie účtu.",
        });
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: error instanceof Error ? error.message : "Vyskytla sa chyba",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isSignUp ? 'Vytvoriť účet' : 'Prihlásiť sa'}</CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Vytvorte si nový účet pre začatie'
              : 'Prihláste sa do svojho účtu'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <Label htmlFor="firstName">Meno</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {isSignUp && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={privacyConsent}
                  onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
                />
                <Label htmlFor="privacy" className="text-sm text-gray-600">
                  Súhlasím so{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                  >
                    spracovaním osobných údajov
                  </Link>
                </Label>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || (isSignUp && !privacyConsent)}
            >
              {isLoading
                ? 'Načítava sa...'
                : isSignUp
                ? 'Vytvoriť účet'
                : 'Prihlásiť sa'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm"
            >
              {isSignUp
                ? 'Už máte účet? Prihláste sa'
                : "Nemáte účet? Zaregistrujte sa"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
