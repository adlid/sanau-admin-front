import { OrganizationTree } from "../../ts/types/groupcontrol.types";

export const findByKeyInGroup = (tree: OrganizationTree | OrganizationTree[], key: string): OrganizationTree | undefined => {
    let result: OrganizationTree | undefined = undefined;

    const inner = (tree: OrganizationTree | OrganizationTree[]) => {
        if(!Array.isArray(tree) && tree.key === key) {
            result = tree
        }
        else if(!Array.isArray(tree) && Array.isArray(tree.children)){
            tree.children.forEach(child => {
                inner(child)
            })
        } else if(Array.isArray(tree)){
            tree.forEach(child => {
                inner(child)
            })
        }
    }

    inner(tree)
    return result
}