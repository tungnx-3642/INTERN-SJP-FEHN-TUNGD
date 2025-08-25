'use client'
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
function SearchForm() {
  const [query, setQuery] = useState('');

  return (
  <div className='relative'>
    <Input 
      type="text"
      id='search'
      name='search'
      value={query}
      placeholder='Tìm kiếm sản phẩm...'
      onChange={(e) => setQuery(e.target.value)}
      className='bg-slate-100 rounded-lg pl-4 py-2 pr-12 focus:outline-none focus:ring-2'
    />
    <Button variant='ghost' className='absolute right-2 top-1/2 -translate-y-1/2'>
      <Search />
    </Button>
  </div>
  );
}

export default SearchForm;
