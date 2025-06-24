'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "sonner";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FormData = {
  name: string;
  bio: string;
  location: string;
  feeRange: string;
};

const categories = ['Singers', 'Dancers', 'Speakers', 'DJs', 'Musicians', 'Comedians'];
const languages = ['Hindi', 'English', 'Punjabi', 'Tamil', 'Telugu', 'Malayalam', 'Bengali', 'Gujarati'];
const feeRanges = [
  '₹5,000 - ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000+'
];

export default function OnboardPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormData>();

  const selectedFeeRange = watch('feeRange');

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    setSelectedLanguages(prev =>
      checked ? [...prev, language] : prev.filter(l => l !== language)
    );
  };

  const onSubmit = async (data: FormData) => {
    if (!selectedCategories.length) {
      toast.error("Please select at least one category.");
      return;
    }
    if (!selectedLanguages.length) {
      toast.error("Please select at least one language.");
      return;
    }

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const formData = {
      ...data,
      categories: selectedCategories,
      languages: selectedLanguages,
      submittedAt: new Date().toISOString()
    };

    console.log('Artist Registration:', formData);
    toast.success("Your artist profile has been submitted successfully.");

    reset();
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Join as an Artist</h1>
        <p className="text-gray-600">Create your profile and start receiving booking requests</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your experience and style..."
                className={`min-h-[100px] ${errors.bio ? 'border-red-500' : ''}`}
                {...register('bio', {
                  required: 'Bio is required',
                  minLength: { value: 50, message: 'Bio must be at least 50 characters' }
                })}
              />
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="City, State (e.g., Delhi, Maharashtra)"
                {...register('location', { required: 'Location is required' })}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Select your performance categories *</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Languages you can perform in *</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {languages.map(language => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) =>
                      handleLanguageChange(language, checked as boolean)
                    }
                  />
                  <Label htmlFor={`language-${language}`} className="text-sm font-normal">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Range */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Range</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="feeRange">Starting fee range *</Label>
            <Select onValueChange={(value) => setValue('feeRange', value)} value={selectedFeeRange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your fee range" />
              </SelectTrigger>
              <SelectContent>
                {feeRanges.map(range => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!selectedFeeRange && <p className="text-red-500 text-sm mt-1">Fee range is required</p>}
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  );
}
