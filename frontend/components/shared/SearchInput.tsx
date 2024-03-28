import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface SearchInputProps {
  query: string;
  onSearch: (query: string) => void;
}

export function SearchInput({ query, onSearch }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState(query || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Button type="submit" onClick={handleSearch}>
        <SearchIcon className="w-full" />
      </Button>
    </div>
  );
}
