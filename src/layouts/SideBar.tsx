import React, { ReactNode, useEffect, useLayoutEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Logo from "../assets/logo/png/logo-no-background.png";
import { getUserAuth, getUsersList } from "../services/user-service";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { clearAllCookies } from "../services/cookie";

// icons
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
interface SideBarProps {
  children: ReactNode;
}

const MainWrapper = styled.div``;

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
export default function SideBar({ children }: SideBarProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(undefined);
  const [navigation, setNavigation] = useState<any[]>([]);
  const onBoard = [
    {
      name: "On Boarding",
      href: "/onboard",
      icon: AccessibilityNewOutlinedIcon,
      current: true,
    },
  ];
  const jobSeeker = [
    {
      name: "Dashboard",
      href: "/",
      icon: DashboardOutlinedIcon,
      current: false,
      scopes: ["JOB_SEEKER", "RECRUITER"],
    },
    {
      name: "My Profile",
      href: "/profile",
      icon: PermIdentityIcon,
      current: false,
      scopes: ["JOB_SEEKER", "RECRUITER"],
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: WorkOutlineOutlinedIcon,
      current: false,
      scopes: ["JOB_SEEKER"],
    },
    {
      name: "Companies",
      href: "/companies",
      icon: StoreOutlinedIcon,
      current: false,
      scopes: ["JOB_SEEKER"],
    },
  ];
  const recruiter = [
    {
      name: "Dashboard",
      href: "/",
      icon: DashboardOutlinedIcon,
      current: false,
      scopes: ["JOB_SEEKER", "RECRUITER"],
    },
    {
      name: "My Profile",
      href: "/my-profile/recruiter",
      icon: PermIdentityIcon,
      current: false,
      scopes: ["JOB_SEEKER", "RECRUITER"],
    },
    {
      name: "Jobs Posted",
      href: "/recruiter/jobs",
      icon: WorkOutlineOutlinedIcon,
      current: false,
      scopes: ["JOB_SEEKER"],
    },
    {
      name: "My companies",
      href: "/recruiter/company",
      icon: StoreOutlinedIcon,
      current: false,
      scopes: ["RECRUITER"],
    },
    // { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    // {
    //   name: "Documents",
    //   href: "#",
    //   icon: DocumentDuplicateIcon,
    //   current: false,
    // },
    // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
  ];

  const location = useLocation();

  console.log("location", location);

  const userNavigation = [
    { name: "Your profile", href: "profile" },
    { name: "Sign out", href: "signout" },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getUserDetails = async () => {
    const userdetails = await getUsersList();
    console.log("userdetails", userdetails);
    if (userdetails?.data) setUser(userdetails?.data);

    if (!userdetails?.data?.role) {
      setNavigation([...onBoard]);
      navigate("/onboard");
    }
    if (userdetails?.data?.role === "JOB_SEEKER") {
      setNavigation([...jobSeeker]);
    }
    if (userdetails?.data?.role === "RECRUITER") {
      setNavigation([...recruiter]);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  console.log("user?.role", user?.role);
  const doAction = (type: string) => {
    if (type === "signout") {
      clearAllCookies();
      navigate("/login");
    }
  };
  return (
    <div>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-6 w-auto mx-auto"
                        src={Logo}
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item: any) => (
                              <li key={item?.name}>
                                <p
                                  onClick={() => navigate(item?.href)}
                                  className={classNames(
                                    location?.pathname === item?.href
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      location?.pathname === item?.href
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/*<li>*/}
                        {/*  <div className="text-xs font-semibold leading-6 text-gray-400">*/}
                        {/*    Your teams*/}
                        {/*  </div>*/}
                        {/*  <ul role="list" className="-mx-2 mt-2 space-y-1">*/}
                        {/*    {teams.map((team) => (*/}
                        {/*      <li key={team.name}>*/}
                        {/*        <a*/}
                        {/*          href={team.href}*/}
                        {/*          className={classNames(*/}
                        {/*            team.current*/}
                        {/*              ? "bg-gray-50 text-indigo-600"*/}
                        {/*              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",*/}
                        {/*            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",*/}
                        {/*          )}*/}
                        {/*        >*/}
                        {/*          <span*/}
                        {/*            className={classNames(*/}
                        {/*              team.current*/}
                        {/*                ? "text-indigo-600 border-indigo-600"*/}
                        {/*                : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",*/}
                        {/*              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white",*/}
                        {/*            )}*/}
                        {/*          >*/}
                        {/*            {team.initial}*/}
                        {/*          </span>*/}
                        {/*          <span className="truncate">{team.name}</span>*/}
                        {/*        </a>*/}
                        {/*      </li>*/}
                        {/*    ))}*/}
                        {/*  </ul>*/}
                        {/*</li>*/}
                        <li className="mt-auto">
                          <p
                            onClick={() => navigate("/settings")}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </p>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-6 w-auto mx-auto"
                src={Logo}
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item: any) => (
                      <li key={item?.name}>
                        <p
                          onClick={() => navigate(item?.href)}
                          className={classNames(
                            location?.pathname === item?.href
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          )}
                        >
                          <item.icon
                            className={classNames(
                              location?.pathname === item?.href
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item?.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
                {/*<li>*/}
                {/*  <div className="text-xs font-semibold leading-6 text-gray-400">*/}
                {/*    Your teams*/}
                {/*  </div>*/}
                {/*  <ul role="list" className="-mx-2 mt-2 space-y-1">*/}
                {/*    {teams.map((team) => (*/}
                {/*      <li key={team.name}>*/}
                {/*        <a*/}
                {/*          href={team.href}*/}
                {/*          className={classNames(*/}
                {/*            team.current*/}
                {/*              ? "bg-gray-50 text-indigo-600"*/}
                {/*              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",*/}
                {/*            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",*/}
                {/*          )}*/}
                {/*        >*/}
                {/*          <span*/}
                {/*            className={classNames(*/}
                {/*              team.current*/}
                {/*                ? "text-indigo-600 border-indigo-600"*/}
                {/*                : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",*/}
                {/*              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white",*/}
                {/*            )}*/}
                {/*          >*/}
                {/*            {team.initial}*/}
                {/*          </span>*/}
                {/*          <span className="truncate">{team.name}</span>*/}
                {/*        </a>*/}
                {/*      </li>*/}
                {/*    ))}*/}
                {/*  </ul>*/}
                {/*</li>*/}
                <li className="mt-auto">
                  <a
                    onClick={() => navigate("/settings")}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user?.firstName}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              onClick={() => doAction(item.href)}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900",
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
