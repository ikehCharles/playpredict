"use client";
import { useState } from "react";
import { Avatar, Badge, MenuProps, Tag } from "antd";
import { IoMdClose } from "react-icons/io";
import { MdMoreVert, MdVerified } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import PredictionCardActions from "./PredictionCardActions";
import BookieBetButton from "./BookieBetButton";
import type { PredictionItemType } from "@models";
import { Button, Dropdown } from "@utilities";


const items: MenuProps['items'] = [
  {
    key: '4',
    danger: true,
    label: 'Flag Prediction',
  },
]


type PredictionDetailsBottomSheetProps = PredictionItemType & {
    isOpen: boolean;
    onClose: () => void;
};

export default function PredictionDetailsBottomSheet({
    isOpen,
    onClose,
    sport,
    league,
    user,
    match,
    prediction,
    stats,
    isSaved = false,
    bookies,
}: PredictionDetailsBottomSheetProps) {
    const [isOddsExpanded, setIsOddsExpanded] = useState(false);

    const primaryBookie = bookies?.[0];
    const displayedBookies = isOddsExpanded ? (bookies ?? []) : (primaryBookie ? [primaryBookie] : []);


    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-80 bg-tertiary/35 backdrop-blur-[2px]"
                onClick={onClose}
            />

            <div className="fixed inset-x-0 bottom-0 z-90 mx-auto w-full max-w-xl md:max-w-4xl lg:max-w-5xl rounded-t-3xl bg-secondary shadow-2xl animate-slide-up">
                <div className="flex items-center justify-between border-b border-tertiary/10 px-4 py-4">
                    <h3 className="font-semibold text-tertiary">Details</h3>
                    <Button
                        onClick={onClose}
                        bgColor="tertiary"
                        bgColorOpacity={0.2}
                        borderColorOpacity={0}
                        textColor="tertiary"
                        aria-label="Close details"
                        borderradius={100}
                        ctrlheight={20}
                        icon={<IoMdClose className="text-sm text-tertiary/70" />}
                    >
                    </Button>
                </div>

                <div className="max-h-[82vh] overflow-y-auto p-4 pb-8">
                    <div className="space-y-4 rounded-xl bg-secondary p-0 text-tertiary">
                        <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                            <Badge color="none" offset={[-5, 30]}>
                                <Avatar size={42} src={user.avatar} />
                            </Badge>

                            <div className="flex-1 leading-tight">
                                <div className="flex items-center gap-1 font-semibold">
                                    {user.name}
                                    {user.verified ? <MdVerified className="text-blue-700" /> : null}
                                    <Tag color="success" className="rounded-xl font-semibold">
                                        +{user.tips}
                                    </Tag>
                                </div>
                                <p className="text-xs text-tertiary/70">@{user.username}</p>
                            </div>
                            <div className="cursor-pointer">
                                <Dropdown  trigger={['click']} menu={{ items }}>
                                    <MdMoreVert className=" text-lg" />
                                </Dropdown>
                            </div>
                        </div>
                        <div className="bg-tertiary/5 font-medium pt-3">


                            <p className="text-center text-sm">
                                {sport} - {league}
                            </p>

                            <div className=" p-4">
                                <div className="mb-4 flex items-center border-b pb-3 border-tertiary/10 justify-between text-sm">
                                    <div className="w-24 text-left font-semibold">{match.home}</div>
                                    <div className="text-center">
                                        <p className="font-semibold">Today</p>
                                        <p className="text-tertiary/60">02:00 PM</p>
                                    </div>
                                    <div className="w-24 text-right font-semibold">{match.away}</div>
                                </div>

                                <div className="flex items-center justify-center gap-3 px-3">
                                    <p className="text-sm font-bold text-center">{prediction.title}</p>

                                </div>
                            </div>


                        </div>

                        <PredictionCardActions
                            likes={stats.likes}
                            showActionText={true}

                            isSaved={isSaved}
                        />
                        {displayedBookies.length > 0 && (
                            <div className="space-y-2">
                                {displayedBookies.map((bookie) => (
                                    <BookieBetButton
                                        key={bookie.name}
                                        logoUrl={bookie.logoUrl}
                                        odd={bookie.odd}
                                        bookieName={bookie.name}
                                    />
                                ))}
                            </div>
                        )}


                        {bookies && bookies.length > 1 && (
                            <button
                                type="button"
                                onClick={() => setIsOddsExpanded((prev) => !prev)}
                                className="flex w-full items-center justify-center gap-2 text-sm font-medium text-primary py-1"
                            >
                                {isOddsExpanded ? (
                                    <>
                                        Collapse <FaChevronUp className="h-3 w-3" />
                                    </>
                                ) : (
                                    <>
                                        Compare odds <FaChevronDown className="h-3 w-3" />
                                    </>
                                )}
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}
