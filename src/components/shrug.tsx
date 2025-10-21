import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { SearchIcon } from "lucide-react"
import * as z from "zod"
import { UseFormReturn } from "react-hook-form"
import { searchSchema } from "./pages/search"
interface NoSearchResultsProps{
     tag: string
     form?: UseFormReturn<z.infer<typeof searchSchema>>,
     onSubmit?: (values: z.infer<typeof searchSchema>) => void
}
export default function NoSearchResults({tag, form, onSubmit}: NoSearchResultsProps){
     return (
          <Empty>
               <EmptyHeader>
                    <EmptyMedia>
                         <p aria-label="shrug" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center text-muted-foreground">¯\_(ツ)_/¯</p>
                    </EmptyMedia>
                    <EmptyTitle className="text-xl md:text-2xl">No results found for {tag}</EmptyTitle>
                    <EmptyDescription>Please Try again searching with another keywords</EmptyDescription>
               </EmptyHeader>
               {!!(form && onSubmit) && (
                    <EmptyContent>
                         <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-3">
                                   <FormField
                                        control={form.control}
                                        name="query"
                                        render={({field})=>(
                                             <FormItem className="w-full">
                                                  <InputGroup>
                                                       <FormControl>
                                                            <InputGroupInput {...field} placeholder="Search tutorials, coding tips..."/>
                                                       </FormControl>
                                                       <InputGroupAddon>
                                                            <SearchIcon/>
                                                       </InputGroupAddon>
                                                       <InputGroupAddon align="inline-end">
                                                            <InputGroupButton type="submit">Search</InputGroupButton>
                                                       </InputGroupAddon>
                                                  </InputGroup>
                                             </FormItem>
                                        )}
                                   />
                              </form>
                         </Form>
                    </EmptyContent>
               )}
          </Empty>
     )
}