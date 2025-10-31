import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
};

type BudgetCategory = {
  name: string;
  planned: number;
  spent: number;
  color: string;
  icon: string;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const incomeExpenseData = [
    { month: 'Янв', income: 120000, expense: 85000 },
    { month: 'Фев', income: 135000, expense: 92000 },
    { month: 'Мар', income: 128000, expense: 88000 },
    { month: 'Апр', income: 142000, expense: 95000 },
    { month: 'Май', income: 138000, expense: 90000 },
    { month: 'Июн', income: 145000, expense: 98000 },
  ];

  const budgetCategories: BudgetCategory[] = [
    { name: 'Продукты', planned: 25000, spent: 22300, color: '#8B5CF6', icon: 'ShoppingCart' },
    { name: 'Транспорт', planned: 8000, spent: 7200, color: '#D946EF', icon: 'Car' },
    { name: 'Развлечения', planned: 12000, spent: 9800, color: '#0EA5E9', icon: 'Film' },
    { name: 'Здоровье', planned: 10000, spent: 8500, color: '#10b981', icon: 'Heart' },
    { name: 'Образование', planned: 15000, spent: 14200, color: '#f59e0b', icon: 'GraduationCap' },
  ];

  const categoryDistribution = budgetCategories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
  }));

  const recentTransactions: Transaction[] = [
    { id: '1', type: 'expense', amount: 2500, category: 'Продукты', description: 'Супермаркет', date: '2025-11-01' },
    { id: '2', type: 'income', amount: 145000, category: 'Зарплата', description: 'Основная работа', date: '2025-11-01' },
    { id: '3', type: 'expense', amount: 1200, category: 'Транспорт', description: 'Заправка', date: '2025-10-31' },
    { id: '4', type: 'expense', amount: 3500, category: 'Развлечения', description: 'Кино и ресторан', date: '2025-10-30' },
    { id: '5', type: 'expense', amount: 890, category: 'Продукты', description: 'Магазин у дома', date: '2025-10-29' },
  ];

  const totalBalance = 347000;
  const monthlyIncome = 145000;
  const monthlyExpense = 98000;
  const savingsGoal = { target: 500000, current: 347000 };

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription className="text-purple-100">Общий баланс</CardDescription>
            <CardTitle className="text-3xl font-display">{totalBalance.toLocaleString('ru-RU')} ₽</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="TrendingUp" size={16} />
              <span className="font-medium">+12% от прошлого месяца</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100">Доходы</CardDescription>
            <CardTitle className="text-3xl font-display">{monthlyIncome.toLocaleString('ru-RU')} ₽</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="ArrowUpCircle" size={16} />
              <span className="font-medium">Текущий месяц</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription className="text-orange-100">Расходы</CardDescription>
            <CardTitle className="text-3xl font-display">{monthlyExpense.toLocaleString('ru-RU')} ₽</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="ArrowDownCircle" size={16} />
              <span className="font-medium">Текущий месяц</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-100">Накопления</CardDescription>
            <CardTitle className="text-3xl font-display">{savingsGoal.current.toLocaleString('ru-RU')} ₽</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(savingsGoal.current / savingsGoal.target) * 100} className="h-2 bg-green-200" />
            <p className="text-xs mt-2">{Math.round((savingsGoal.current / savingsGoal.target) * 100)}% от цели</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg border-2 border-purple-100">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Icon name="TrendingUp" className="text-purple-500" />
              Доходы и расходы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={incomeExpenseData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="income" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorIncome)" name="Доходы" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" name="Расходы" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Icon name="PieChart" className="text-blue-500" />
              Распределение расходов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Icon name="Clock" className="text-gray-600" />
            Последние транзакции
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                      : 'bg-gradient-to-br from-red-400 to-pink-500'
                  }`}>
                    <Icon 
                      name={transaction.type === 'income' ? 'ArrowDownCircle' : 'ArrowUpCircle'} 
                      className="text-white" 
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {transaction.amount.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString('ru-RU')}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-lg border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Планирование бюджета</CardTitle>
          <CardDescription>Управляйте расходами по категориям</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {budgetCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                    style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }}
                  >
                    <Icon name={category.icon as any} className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">
                      {category.spent.toLocaleString('ru-RU')} ₽ из {category.planned.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={category.spent > category.planned ? 'destructive' : 'default'}
                  className="font-semibold"
                >
                  {Math.round((category.spent / category.planned) * 100)}%
                </Badge>
              </div>
              <Progress 
                value={(category.spent / category.planned) * 100} 
                className="h-3"
                style={{ 
                  // @ts-ignore
                  '--progress-background': category.color 
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg border-2 border-blue-100">
        <CardHeader>
          <CardTitle className="font-display">Сравнение бюджета</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={budgetCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" fill="#8B5CF6" name="Запланировано" radius={[8, 8, 0, 0]} />
              <Bar dataKey="spent" fill="#D946EF" name="Потрачено" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-lg border-2 border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-2xl">Все транзакции</CardTitle>
            <CardDescription>История ваших финансовых операций</CardDescription>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all hover:scale-[1.01] border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                      : 'bg-gradient-to-br from-red-400 to-pink-500'
                  }`}>
                    <Icon 
                      name={transaction.type === 'income' ? 'ArrowDownCircle' : 'ArrowUpCircle'} 
                      className="text-white" 
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{transaction.category}</Badge>
                      <span className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
                <p className={`font-bold text-xl ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {transaction.amount.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-lg border-2 border-purple-100">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Финансовая аналитика</CardTitle>
          <CardDescription>Детальный анализ ваших финансов</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={incomeExpenseData}>
              <defs>
                <linearGradient id="colorIncome2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome2)" name="Доходы" />
              <Area type="monotone" dataKey="expense" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorExpense2)" name="Расходы" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="font-display">Средний доход</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">136k ₽</p>
            <p className="text-sm text-purple-100 mt-2">За последние 6 месяцев</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="font-display">Средний расход</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">91k ₽</p>
            <p className="text-sm text-pink-100 mt-2">За последние 6 месяцев</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="font-display">Средняя экономия</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">45k ₽</p>
            <p className="text-sm text-blue-100 mt-2">За последние 6 месяцев</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-2">
            Семейный Бюджет
          </h1>
          <p className="text-gray-600 text-lg">Управляйте финансами с умом</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid bg-white shadow-lg p-2 rounded-2xl border-2 border-gray-100">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-semibold transition-all">
              <Icon name="LayoutDashboard" size={18} className="mr-2" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-semibold transition-all">
              <Icon name="Receipt" size={18} className="mr-2" />
              Транзакции
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-semibold transition-all">
              <Icon name="PiggyBank" size={18} className="mr-2" />
              Бюджет
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-semibold transition-all">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="salary" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-semibold transition-all">
              <Icon name="Banknote" size={18} className="mr-2" />
              Зарплаты
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-semibold transition-all">
              <Icon name="Calendar" size={18} className="mr-2" />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-semibold transition-all">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
          <TabsContent value="transactions">{renderTransactions()}</TabsContent>
          <TabsContent value="budget">{renderBudget()}</TabsContent>
          <TabsContent value="analytics">{renderAnalytics()}</TabsContent>
          <TabsContent value="salary">
            <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Зарплаты и отпуска</CardTitle>
                <CardDescription>Раздел в разработке</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Финансовый календарь</CardTitle>
                <CardDescription>Раздел в разработке</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Настройки приложения</CardTitle>
                <CardDescription>Раздел в разработке</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
