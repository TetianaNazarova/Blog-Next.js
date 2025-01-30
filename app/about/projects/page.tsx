import ProjectList from "@/app/about/projects/components/project-list";
import {Suspense} from "react";
import ProjectListLoading from "@/app/about/projects/components/project-list-loading";
import {ErrorBoundary} from "react-error-boundary";
import type {Metadata} from "next";
import H1 from "@/components/h1";

export const metadata: Metadata = {
    description: "My Projects Page in My App",
};

export default async function ProjectsPage() {
    return (
        <div>
            <H1>Projects</H1>

            <div className="mb-8">Hello, this is the list of my repos!</div>

            <ErrorBoundary fallback={<div>Cannot fetch projects currently</div>}>
                <Suspense fallback={<ProjectListLoading />}>
                    <ProjectList />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
}

