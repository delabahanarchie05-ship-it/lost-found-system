import * as React from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import { destroy, update } from '@/routes/dashboard';

type DashboardEntry = {
    id: number;
    item: string;
    description: string;
    location: string;
    date: string;
    status: string;
    created_at: string;
};

type DashboardPageProps = {
    dashboards: DashboardEntry[];
};

export default function Dashboard() {
    const { dashboards } = usePage<DashboardPageProps>().props;
    const recentUploads = [...dashboards].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    const form = useForm({
        item: '',
        description: '',
        location: '',
        date: '',
        status: '',
    });

    const [editingId, setEditingId] = React.useState<number | null>(null);

    function startEdit(item: DashboardEntry) {
        setEditingId(item.id);
        form.setData({
            item: item.item,
            description: item.description,
            location: item.location,
            date: item.date,
            status: item.status,
        });
    }

    function cancelEdit() {
        setEditingId(null);
        form.reset();
    }

    function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (editingId === null) {
            return;
        }

        router.put(update({ dashboard: editingId }).url, form.data, {
            onSuccess: () => {
                cancelEdit();
                router.reload({ only: ['dashboards'] });
            },
        });
    }

    function handleDelete(item: DashboardEntry) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.item}"?`,
        );

        if (!confirmed) {
            return;
        }

        router.delete(destroy({ dashboard: item.id }).url, {
            onSuccess: () => {
                router.reload({ only: ['dashboards'] });
            },
        });
    }

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-4 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                    <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                        Recent lost item uploads
                    </h2>

                    <div className="space-y-3">
                        {recentUploads.length === 0 ? (
                            <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400">
                                No recent uploads yet.
                            </div>
                        ) : (
                            recentUploads.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-md border border-border bg-background px-3 py-2"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                                {item.item}
                                            </p>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {item.location} • {item.date}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => startEdit(item)}
                                                className="rounded-md border border-border px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-accent dark:text-neutral-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item)}
                                                className="rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-500/20"
                                            >
                                                Delete
                                            </button>
                                            <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>

                                    {editingId === item.id && (
                                        <form
                                            onSubmit={handleEditSubmit}
                                            className="mt-4 space-y-4 rounded-md border border-border bg-white p-3 dark:bg-neutral-950"
                                        >
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`edit-item-${item.id}`}>
                                                        Item
                                                    </Label>
                                                    <Input
                                                        id={`edit-item-${item.id}`}
                                                        value={form.data.item}
                                                        onChange={(e) =>
                                                            form.setData('item', e.target.value)
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`edit-location-${item.id}`}>
                                                        Location
                                                    </Label>
                                                    <Input
                                                        id={`edit-location-${item.id}`}
                                                        value={form.data.location}
                                                        onChange={(e) =>
                                                            form.setData('location', e.target.value)
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`edit-date-${item.id}`}>
                                                        Date
                                                    </Label>
                                                    <Input
                                                        id={`edit-date-${item.id}`}
                                                        type="date"
                                                        value={form.data.date}
                                                        onChange={(e) =>
                                                            form.setData('date', e.target.value)
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`edit-status-${item.id}`}>
                                                        Status
                                                    </Label>
                                                    <Input
                                                        id={`edit-status-${item.id}`}
                                                        value={form.data.status}
                                                        onChange={(e) =>
                                                            form.setData('status', e.target.value)
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`edit-description-${item.id}`}>
                                                    Description
                                                </Label>
                                                <textarea
                                                    id={`edit-description-${item.id}`}
                                                    value={form.data.description}
                                                    onChange={(e) =>
                                                        form.setData('description', e.target.value)
                                                    }
                                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                    required
                                                />
                                            </div>

                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={cancelEdit}
                                                    className="rounded-md border border-border px-3 py-2 text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <Button type="submit" disabled={form.processing}>
                                                    Save changes
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
