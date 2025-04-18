
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserInfo } from '@/utils/types';

interface UserFormProps {
  onSubmit: (data: UserInfo) => void;
}

const UserForm = ({ onSubmit }: UserFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserInfo>({
    defaultValues: {
      firstName: '',
      email: '',
      age: 0,
      painArea: 'neck'
    }
  });
  
  const painArea = watch('painArea');
  
  const handleRadioChange = (value: 'neck' | 'middle back' | 'lower back') => {
    setValue('painArea', value);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-blue-700">
          MSK Pain Navigator
        </CardTitle>
        <CardDescription className="text-center">
          Please provide your information to start the assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register('firstName', { required: 'First name is required' })}
              placeholder="Enter your first name"
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email'
                }
              })}
              placeholder="Enter your email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              {...register('age', { 
                required: 'Age is required',
                min: {
                  value: 1,
                  message: 'Age must be at least 1'
                },
                max: {
                  value: 120,
                  message: 'Age must be at most 120'
                }
              })}
              placeholder="Enter your age"
              className={errors.age ? 'border-red-500' : ''}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>
          
          <div className="space-y-3">
            <Label>Please specify the exact area of your pain</Label>
            <RadioGroup 
              defaultValue="neck" 
              value={painArea}
              onValueChange={(value) => handleRadioChange(value as 'neck' | 'middle back' | 'lower back')}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neck" id="neck" />
                <Label htmlFor="neck" className="cursor-pointer">Neck</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="middle back" id="middle-back" />
                <Label htmlFor="middle-back" className="cursor-pointer">Middle Back</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lower back" id="lower-back" />
                <Label htmlFor="lower-back" className="cursor-pointer">Lower Back</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Start Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
