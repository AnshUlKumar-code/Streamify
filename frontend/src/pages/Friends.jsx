import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import { MessageSquareIcon, UserIcon } from "lucide-react";
import NoFriendsFound from "../components/NoFriendsFound";
import { getLanguageFlag } from "../components/FriendCard";
import { capitialize } from "../lib/utils";

const Friends = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Friends</h1>
            <p className="text-base-content/70 mt-1">
              {friends.length} {friends.length === 1 ? "friend" : "friends"} connected
            </p>
          </div>
          <Link to="/" className="btn btn-outline btn-sm">
            Find New Friends
          </Link>
        </div>

        {friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="card bg-base-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body p-5">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full">
                        <img
                          src={friend.profilePic}
                          alt={friend.fullName}
                          className="object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.fullName)}`;
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{friend.fullName}</h3>
                      {friend.location && (
                        <p className="text-sm text-base-content/70 truncate">
                          {friend.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-secondary badge-sm flex items-center gap-1">
                      {getLanguageFlag(friend.nativeLanguage)}
                      Native: {capitialize(friend.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline badge-sm flex items-center gap-1">
                      {getLanguageFlag(friend.learningLanguage)}
                      Learning: {capitialize(friend.learningLanguage)}
                    </span>
                  </div>

                  {/* Bio */}
                  {friend.bio && (
                    <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                      {friend.bio}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      to={`/chat/${friend._id}`}
                      className="btn btn-primary btn-sm flex-1"
                    >
                      <MessageSquareIcon className="size-4 mr-2" />
                      Message
                    </Link>
                    {/* <Link
                      to={`/profile/${friend._id}`}
                      className="btn btn-ghost btn-sm"
                    >
                      <UserIcon className="size-4" />
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;