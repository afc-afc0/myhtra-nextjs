import { AuthController } from "@components/ui/Auth/AuthController/AuthController";
import { Button } from "@components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@components/ui/Dialog/Dialog";
import { Input } from "@components/ui/Form/Input/Input";
import { Label } from "@components/ui/Form/Label/Label";
import { FlexContainer } from "@components/ui/Layout/FlexContainer/FlexContainer";
import { Text } from "@components/ui/Text/Text";
import { useCreatePost } from "@hooks/usePost";
import { useSession } from "next-auth/react";

export const CreatePostDialog = () => {
  return (
    <FlexContainer width="100%" justifyContent="flex-end" alignItems="flex-end">
      <Dialog>
        <DialogTrigger asChild>
          <FlexContainer marginBottom="s">
            <Button text="Create post" />
          </FlexContainer>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Text text="Create post" />
          </DialogHeader>
          <CreatePostDialogContent />
        </DialogContent>
      </Dialog>
    </FlexContainer>
  );
};

const CreatePostDialogContent = () => {
  const { status } = useSession();
  const { loading, createPostRequest, setCreatePostRequest, handleCreatePost } =
    useCreatePost();

  return (
    <FlexContainer width="100%" gapSize="s">
      {status === "authenticated" && (
        <>
          <FlexContainer width="100%">
            <Label label="Post Name" htmlFor="postName" />
            <Input
              id="postName"
              value={createPostRequest.name}
              onChange={(e) => setCreatePostRequest({ name: e.target.value })}
            />
          </FlexContainer>
          <FlexContainer
            width="100%"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              text="Create"
              loading={loading}
              onClick={handleCreatePost}
            />
          </FlexContainer>
        </>
      )}
      {status !== "authenticated" && (
        <FlexContainer
          width="100%"
          justifyContent="flex-start"
          alignItems="flex-start"
          gapSize="s"
        >
          <Text text="Please log in to create a post" fontWeight="light" />
          <AuthController />
        </FlexContainer>
      )}
    </FlexContainer>
  );
};
