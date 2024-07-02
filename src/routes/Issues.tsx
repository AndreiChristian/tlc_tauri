import PageWrapper from "@/components/layout/PageWrapper";
import Title from "@/components/Title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateNewItemDialog from "@/components/issues/CreateNewIssuesDialog";
import { Button } from "@/components/ui/button";
import { Redo2 } from "lucide-react";
import { useGetFullList } from "@/pb/hooks/useGetFullList";
import IssuesTable from "@/components/issues/IssuesTable";

export default function Issues() {

  const { records, loading, error, refetch } = useGetFullList<any>("issues")

  if (loading) {
    return <div>Loading ...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return <PageWrapper>
    <Title title="Probleme" />
    <div className="h-5" ></div>
    <Tabs defaultValue="unsolved" className="">
      <div className="flex items-center justify-start gap-4" >
        <TabsList>
          <TabsTrigger value="unsolved">Nerezolvate</TabsTrigger>
          <TabsTrigger value="urgent">Urgente</TabsTrigger>
          <TabsTrigger value="all">Toate</TabsTrigger>
        </TabsList>
        <span className="flex-1" ></span>
        <CreateNewItemDialog refetch={refetch} />
        <Button onClick={refetch} >
          <Redo2 className="mr-2 h-4 w-4" /> Reincarca
        </Button>
      </div>
      <TabsContent value="all">
        <IssuesTable issues={records} refetch={refetch} />
      </TabsContent>
      <TabsContent value="urgent">
        <IssuesTable issues={records.filter(r => !r.solved && r.urgent)} refetch={refetch} />
      </TabsContent>
      <TabsContent value="unsolved">
        <IssuesTable issues={records.filter(r => !r.solved)} refetch={refetch} />
      </TabsContent>
    </Tabs>


  </PageWrapper>
}

