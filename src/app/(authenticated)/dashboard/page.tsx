import ProjectsList from "@/components/dashboard/projects-list";

export default function Page() {
  return (
    <div>
      <h1 className="mb-8 font-black text-2xl">Apps</h1>
      <div className="flex h-full w-full flex-col">
        <ProjectsList/>        
      </div>
    </div>
  );
}
