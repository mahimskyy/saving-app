import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Calculator, TrendingUp, Coins, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  country: string;
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'Russia' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', country: 'Poland' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', country: 'Czech Republic' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', country: 'Hungary' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu', country: 'Romania' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', country: 'Bulgaria' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', country: 'Croatia' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel', country: 'Israel' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'United Arab Emirates' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', country: 'Saudi Arabia' },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal', country: 'Qatar' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', country: 'Kuwait' },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', country: 'Bahrain' },
  { code: 'OMR', symbol: '﷼', name: 'Omani Rial', country: 'Oman' },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar', country: 'Jordan' },
  { code: 'LBP', symbol: '£', name: 'Lebanese Pound', country: 'Lebanon' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound', country: 'Egypt' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', country: 'Morocco' },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', country: 'Tunisia' },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', country: 'Algeria' },
  { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar', country: 'Libya' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi', country: 'Ghana' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', country: 'Uganda' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', country: 'Tanzania' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', country: 'Ethiopia' },
  { code: 'BWP', symbol: 'P', name: 'Botswana Pula', country: 'Botswana' },
  { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee', country: 'Mauritius' },
  { code: 'SCR', symbol: '₨', name: 'Seychellois Rupee', country: 'Seychelles' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', country: 'Argentina' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso', country: 'Chile' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso', country: 'Colombia' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', country: 'Peru' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', country: 'Uruguay' },
  { code: 'PYG', symbol: 'Gs', name: 'Paraguayan Guarani', country: 'Paraguay' },
  { code: 'BOB', symbol: '$b', name: 'Bolivian Boliviano', country: 'Bolivia' },
  { code: 'VES', symbol: 'Bs', name: 'Venezuelan Bolívar', country: 'Venezuela' },
  { code: 'GYD', symbol: '$', name: 'Guyanese Dollar', country: 'Guyana' },
  { code: 'SRD', symbol: '$', name: 'Surinamese Dollar', country: 'Suriname' },
  { code: 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago Dollar', country: 'Trinidad and Tobago' },
  { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar', country: 'Jamaica' },
  { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar', country: 'Barbados' },
  { code: 'BSD', symbol: 'B$', name: 'Bahamian Dollar', country: 'Bahamas' },
  { code: 'BZD', symbol: 'BZ$', name: 'Belize Dollar', country: 'Belize' },
  { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', country: 'Guatemala' },
  { code: 'HNL', symbol: 'L', name: 'Honduran Lempira', country: 'Honduras' },
  { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba', country: 'Nicaragua' },
  { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón', country: 'Costa Rica' },
  { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa', country: 'Panama' },
  { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso', country: 'Dominican Republic' },
  { code: 'HTG', symbol: 'G', name: 'Haitian Gourde', country: 'Haiti' },
  { code: 'CUP', symbol: '₱', name: 'Cuban Peso', country: 'Cuba' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines' },
  { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar', country: 'Taiwan' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', country: 'Pakistan' },
  { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee', country: 'Sri Lanka' },
  { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee', country: 'Nepal' },
  { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum', country: 'Bhutan' },
  { code: 'MVR', symbol: '.ރ', name: 'Maldivian Rufiyaa', country: 'Maldives' },
  { code: 'AFN', symbol: '؋', name: 'Afghan Afghani', country: 'Afghanistan' },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial', country: 'Iran' },
  { code: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinar', country: 'Iraq' },
  { code: 'SYP', symbol: '£', name: 'Syrian Pound', country: 'Syria' },
  { code: 'YER', symbol: '﷼', name: 'Yemeni Rial', country: 'Yemen' },
  { code: 'UZS', symbol: 'лв', name: 'Uzbekistani Som', country: 'Uzbekistan' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', country: 'Kazakhstan' },
  { code: 'KGS', symbol: 'лв', name: 'Kyrgyzstani Som', country: 'Kyrgyzstan' },
  { code: 'TJS', symbol: 'ЅМ', name: 'Tajikistani Somoni', country: 'Tajikistan' },
  { code: 'TMT', symbol: 'T', name: 'Turkmenistani Manat', country: 'Turkmenistan' },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', country: 'Azerbaijan' },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari', country: 'Georgia' },
  { code: 'AMD', symbol: '֏', name: 'Armenian Dram', country: 'Armenia' },
  { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble', country: 'Belarus' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', country: 'Ukraine' },
  { code: 'MDL', symbol: 'L', name: 'Moldovan Leu', country: 'Moldova' },
  { code: 'ALL', symbol: 'L', name: 'Albanian Lek', country: 'Albania' },
  { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar', country: 'North Macedonia' },
  { code: 'RSD', symbol: 'Дин.', name: 'Serbian Dinar', country: 'Serbia' },
  { code: 'BAM', symbol: 'KM', name: 'Bosnia-Herzegovina Convertible Mark', country: 'Bosnia and Herzegovina' },
  { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik', country: 'Mongolia' },
  { code: 'LAK', symbol: '₭', name: 'Laotian Kip', country: 'Laos' },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel', country: 'Cambodia' },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', country: 'Myanmar' },
  { code: 'BND', symbol: '$', name: 'Brunei Dollar', country: 'Brunei' },
  { code: 'FJD', symbol: '$', name: 'Fijian Dollar', country: 'Fiji' },
  { code: 'NZD', symbol: '$', name: 'New Zealand Dollar', country: 'New Zealand' },
  { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga', country: 'Tonga' },
  { code: 'WST', symbol: 'T', name: 'Samoan Tala', country: 'Samoa' },
  { code: 'VUV', symbol: 'Vt', name: 'Vanuatu Vatu', country: 'Vanuatu' },
  { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina', country: 'Papua New Guinea' },
  { code: 'SBD', symbol: '$', name: 'Solomon Islands Dollar', country: 'Solomon Islands' },
  { code: 'NCX', symbol: '₣', name: 'CFP Franc', country: 'New Caledonia' },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', country: 'Iceland' },
  { code: 'FOK', symbol: 'kr', name: 'Faroese Króna', country: 'Faroe Islands' },
];

interface SavingsPeriod {
  label: string;
  days: number;
  color: string;
  bgColor: string;
  icon: string;
}

const savingsPeriods: SavingsPeriod[] = [
  { label: '30 Days', days: 30, color: 'text-blue-600', bgColor: 'bg-blue-50', icon: '📅' },
  { label: '1 Year', days: 365, color: 'text-green-600', bgColor: 'bg-green-50', icon: '🎯' },
  { label: '5 Years', days: 365 * 5, color: 'text-purple-600', bgColor: 'bg-purple-50', icon: '🚀' },
  { label: '10 Years', days: 365 * 10, color: 'text-orange-600', bgColor: 'bg-orange-50', icon: '💎' },
  { label: '15 Years', days: 365 * 15, color: 'text-pink-600', bgColor: 'bg-pink-50', icon: '🏆' },
  { label: '20 Years', days: 365 * 20, color: 'text-red-600', bgColor: 'bg-red-50', icon: '👑' },
];

export default function SavingsCalculator() {
  const [dailyAmount, setDailyAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateSavings = (days: number): number => {
    const daily = parseFloat(dailyAmount) || 0;
    return daily * days;
  };

  const handleDailyAmountChange = (value: string) => {
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value) || value === '') {
      setDailyAmount(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text">
              Daily Savings Calculator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how your small daily savings can grow into substantial wealth over time
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Coins className="h-6 w-6 text-primary" />
              Set Your Daily Savings
            </CardTitle>
            <CardDescription className="text-lg">
              Enter how much you plan to save each day
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="space-y-2">
                <Label htmlFor="daily-amount" className="text-base font-medium">
                  Daily Amount
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground font-medium">
                    {currency.symbol}
                  </span>
                  <Input
                    id="daily-amount"
                    type="text"
                    placeholder="0.00"
                    value={dailyAmount}
                    onChange={(e) => handleDailyAmountChange(e.target.value)}
                    className="pl-8 text-lg h-12 border-2 focus:border-primary/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-base font-medium">
                  Currency
                </Label>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isOpen}
                      className="w-full justify-between h-12 border-2 focus:border-primary/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{currency.symbol}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground">- {currency.name}</span>
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search currencies..." />
                      <CommandList>
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup>
                          {currencies.map((curr) => (
                            <CommandItem
                              key={curr.code}
                              value={`${curr.code} ${curr.name} ${curr.country}`}
                              onSelect={() => {
                                setCurrency(curr);
                                setIsOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currency.code === curr.code ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{curr.symbol}</span>
                                <span className="font-medium">{curr.code}</span>
                                <span className="text-muted-foreground">- {curr.name}</span>
                                <span className="text-xs text-muted-foreground">({curr.country})</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsPeriods.map((period, index) => {
            const savings = calculateSavings(period.days);
            return (
              <Card 
                key={period.label}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/60 backdrop-blur-sm hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl ${period.color}`}>
                      {period.label}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${period.bgColor} text-2xl`}>
                      {period.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-foreground">
                      {formatCurrency(savings)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {period.days.toLocaleString()} days of saving
                    </div>
                    {savings > 0 && (
                      <div className="flex items-center gap-1 text-success">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {((savings / parseFloat(dailyAmount || '1')) * 100 / period.days).toFixed(1)}% growth factor
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Motivational Footer */}
        {parseFloat(dailyAmount) > 0 && (
          <Card className="mt-8 border-0 bg-gradient-to-r from-primary/10 to-primary-glow/10 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-primary">
                  💡 Amazing! Your commitment to save {formatCurrency(parseFloat(dailyAmount))} daily
                </h3>
                <p className="text-muted-foreground">
                  could result in <strong className="text-primary">{formatCurrency(calculateSavings(365 * 20))}</strong> over 20 years!
                </p>
                <p className="text-sm text-muted-foreground">
                  Remember: Small, consistent actions lead to extraordinary results. 🌟
                </p>
              </div>
            </CardContent>
          </Card>
        )}
<ins style="width: 468px;height:60px" data-width="468" data-height="60" class="z83ee7cddc7" data-domain="//195683.fun" data-affquery="/a2a59b945297b05b35be/83ee7cddc7/?placementName=default"><script src="//195683.fun/js/responsive.js" async></script></ins>

        {/* Inspirational Footer */}
        <Card className="mt-8 border-0 bg-gradient-to-r from-success/10 via-primary/5 to-warning/10 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-glow/5 animate-pulse"></div>
          <CardContent className="pt-8 pb-8 relative z-10">
            <div className="text-center space-y-6">
              {/* Main Quote */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-success bg-clip-text text-transparent leading-tight">
                  "Discipline is doing it daily—even when it's small"
                </h2>
                <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
                  <span>💪</span>
                  <span>Build wealth one day at a time</span>
                  <span>💪</span>
                </div>
              </div>

              {/* Engaging Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-6">
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-foreground">Small Steps</div>
                  <div className="text-xs text-muted-foreground">Big Results</div>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-success/20 hover:border-success/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-sm font-medium text-foreground">Compound Growth</div>
                  <div className="text-xs text-muted-foreground">Time is Magic</div>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-warning/20 hover:border-warning/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-medium text-foreground">Financial Freedom</div>
                  <div className="text-xs text-muted-foreground">Your Goal</div>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
                  <span>✨</span>
                  Did You Know?
                  <span>✨</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>☕</span>
                    <span>Skipping one coffee = $5 daily = $1,825 yearly!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚗</span>
                    <span>$10 daily for 30 years = $109,500+ invested!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏠</span>
                    <span>Consistency beats perfection every single time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💎</span>
                    <span>The best time to start was yesterday, today is next best</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4">
                <p className="text-primary font-medium text-lg animate-pulse">
                  🌟 Start your wealth journey today - every dollar counts! 🌟
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
