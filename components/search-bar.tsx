"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"

export function SearchBar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [artist, setArtist] = useState("")
  const [year, setYear] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (searchTerm) params.append("search", searchTerm)
    if (artist) params.append("artist", artist)
    if (year) params.append("year", year)

    router.push(`/catalog?${params.toString()}`)
  }

  return (
    <Card className="p-6 shadow-xl max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por título de álbum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 text-lg"
          />
        </div>

        <div className="w-full md:w-48">
          <Select value={artist} onValueChange={setArtist}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Artista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="taylor-swift">Taylor Swift</SelectItem>
              <SelectItem value="billie-eilish">Billie Eilish</SelectItem>
              <SelectItem value="bad-bunny">Bad Bunny</SelectItem>
              <SelectItem value="psy-a">PSY A</SelectItem>
              <SelectItem value="dua-lipa">Dua Lipa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-32">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
              <SelectItem value="2018">2018</SelectItem>
              <SelectItem value="2015">2015</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90">
          <Search className="mr-2 h-5 w-5" />
          Buscar
        </Button>
      </form>
    </Card>
  )
}
