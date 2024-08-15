import { useEffect, useState } from "react";
import projectsApi from "../api/projects-api";

export function useGetByCategory(categoty) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                if (categoty === 'all') {
                    setProjects(await projectsApi.getAll());
                } else {
                    setProjects(await projectsApi.getByCategory(categoty));
                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        })();
    }, [categoty]);

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

