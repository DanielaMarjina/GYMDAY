export function generateMonthlyProgram() {
  const dayTypes = ['REST DAY', 'GLUTE DAY',  'BACK & ARMS DAY', 'LEG DAY', 'REST DAY', 'GLUTE DAY', 
    'BACK & CHEST & ABS DAY'];
    const today= new Date();
    const year=today.getFullYear();
    const month=today.getMonth();
    const daysInMonth=new Date(year,month+1,0).getDate();

    const calendar={}

    for (let day=1; day<=daysInMonth; day++)
    {
        const date=new Date(year,month,day);
        const iso=date.toISOString().split('T')[0];
        const weekday=date.getDay();
        calendar[iso]={type: dayTypes[weekday]};
    }

    return calendar;
    
    }