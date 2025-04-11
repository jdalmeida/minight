"use client"

import { api } from "@/trpc/react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type React from "react"
import CreateDeployment from "./create-deployment"
import { GitBranchIcon, PlusCircleIcon } from "lucide-react"
import { Badge } from "../ui/badge"

const ProjectsList: React.FC = () => {
  const [page, setPage] = useState(0)
  const { data, isLoading, isError } = api.repo.getPaginatedProjects.useQuery({ page, limit: 10 })

  if (isLoading) {
    return <div>Loading projects...</div>
  }

  if (isError || !data || !Array.isArray(data.projects)) {
    return (
      <Card className="flex w-full max-w-xl flex-col items-center justify-center rounded-md border-dashed p-8">
        <PlusCircleIcon className="size-10"/>
        <p>Sem nenhum deploy ainda.</p>
        <CreateDeployment/>
      </Card>
    )
  }

  const totalPages = data.totalPages ?? 0

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Show first page, current page and neighbors, and last page
      if (page <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push(null) // Ellipsis
        pageNumbers.push(totalPages)
      } else if (page >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1)
        pageNumbers.push(null) // Ellipsis
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        // Middle
        pageNumbers.push(1)
        pageNumbers.push(null) // Ellipsis
        pageNumbers.push(page - 1)
        pageNumbers.push(page)
        pageNumbers.push(page + 1)
        pageNumbers.push(null) // Ellipsis
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  return (
    <>
        {
          data.projects.length > 0 ? (
            <div className="flex flex-col justify-end gap-4">
              <div className="flex items-end justify-end">
                <CreateDeployment/>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {
                data.projects.map((project) => (
                  <Card key={project.id} className="transition hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-semibold text-lg">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                      <Badge className="text-gray-500 text-xs">
                        <GitBranchIcon className="mr-1" />
                        {project.branch}
                      </Badge>
                    </CardContent>
                  </Card>
                ))
              }
              </div>
            </div>
        ) : (
          <Card className="flex w-full max-w-xl flex-col items-center justify-center rounded-md border-dashed p-8">
            <PlusCircleIcon className="size-10"/>
            <p>Sem nenhum deploy ainda.</p>
            <CreateDeployment/>
          </Card>
        )}
        {
          data.projects.length > 0 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((pageNumber, index) =>
                    pageNumber === null ? (
                      <PaginationItem key={`ellipsis-${pageNumber}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setPage(pageNumber)}
                          isActive={page === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )
        }
    </>
  )
}

export default ProjectsList
