import { useEffect, useState } from "react";
import projectsApi from "../api/projects-api";

export function useGetAllProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const projectsResult = await projectsApi.getAll();
                setProjects(projectsResult);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        })();
    }, []);

    return [projects, setProjects];
}

export function useGetOneProject(projectId) {
    const [project, setProject] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const projectResult = await projectsApi.getOneById(projectId);
                setProject(projectResult);
            } catch (error) {
                console.error("Failed to fetch project:", error);
            }
        })();
    }, [projectId]);

    return [project, setProject];
}